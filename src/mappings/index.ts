import { serializer } from '@kodadot1/metasquid'
import { create } from '@kodadot1/metasquid/entity'
import * as erc721 from '../abi/ERC721'
import { Multicall } from '../abi/multicall'
import { CollectionEntity as CE, NFTEntity as NE } from '../model'
import { CONTRACT_ADDRESS } from '../processor'
import { handler as handle721Token } from './erc721'
import { ERC721_TRANSFER } from './erc721/utils'
import { MULTICALL_ADDRESS, MULTICALL_BATCH_SIZE } from './utils/constants'
import { findByIdListAsMap } from './utils/entity'
import { lastBatchBlock } from './utils/evm'
import { finalizeCollections } from './utils/lookups'
import { BlockData, Context, EnMap, EventEntity, ItemStateUpdate, Log, createTokenId } from './utils/types'
import { groupedItemsByCollection, uniqueEntitySets } from './utils/unique'

export async function mainFrame(ctx: Context): Promise<void> {
  const items = []

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      const item = unwrapLog(log, block)
      if (item) {
        items.push(item)
      }
    }
  }

  if (items.length === 0) {
    return
  }

  const { contracts, tokens } = uniqueEntitySets(items)
  const collections = await finalizeCollections(contracts, ctx)
  const finish = await whatToDoWithTokens({ tokens, collections, items }, ctx)
  const complete = await completeTokens(ctx, finish)


  console.log('FINISHING', JSON.stringify(complete, serializer, 2))
}

function unwrapLog(log: Log, block: BlockData) {
  switch (log.topics[0]) {
    case ERC721_TRANSFER:
      
      if (log.address !== CONTRACT_ADDRESS) {
        return null
      }
      console.log('erc721 transfer', log.topics, log.address === CONTRACT_ADDRESS)
      return handle721Token(log, block)
    default:
      // console.log('unknown log', log.topics[0])
      return null
    // throw new Error('unknown log')
  }
}

type What = {
  tokens: Set<string>,
  collections: EnMap<CE>,
  items: ItemStateUpdate[],
}

export async function whatToDoWithTokens(
  { tokens, collections, items }: What,
  ctx: Context
) {
  // ctx.store.findBy(CE, {id: In([...collectionMap.keys()])})
  const knownTokens = await findByIdListAsMap(ctx.store, NE, tokens)
  const events: EventEntity[] = []

  for (const item of items) {
    console.log(`APPLY ${item.interaction} on ${item.id}`)
    let knownToken = knownTokens.get(item.id) ?? create(NE, item.id, {})

    if (item.applyFrom) {
      const collection = collections.get(item.contract)!
      item.applyFrom(collection)
    }
    if (item.applyTo) {
      knownToken = item.applyTo(knownToken)
    }

    events.push(item.event)
    knownTokens.set(item.id, knownToken)
  }

  const values = [...knownTokens.values()]
  console.log(JSON.stringify(values, serializer, 2))

  await ctx.store.upsert([...knownTokens.values()])
  await ctx.store.save(events)

  return knownTokens
}

async function completeTokens(ctx: Context, tokenMap: EnMap<NE>) {
  const collections = groupedItemsByCollection(tokenMap.keys())
  const final: NE[] = []

  for (const [contract, ids] of collections.entries()) {
    const list = Array.from(ids)
    const tokens = await multicallMetadataFetch(ctx, contract, list)
    for (const [i, id] of list.entries()) {
      const realId = createTokenId(contract, id)
      const token = tokenMap.get(realId)!
      token.metadata = tokens[i]
      final.push(token)
    }
  }

  await ctx.store.save(final)
  return final
}

async function multicallMetadataFetch(ctx: Context, collection: string, tokens: Array<string>): Promise<string[]> {
  const tokenIds = tokens.map((id) => [BigInt(id)])
  const contract = new Multicall(ctx, lastBatchBlock(ctx), MULTICALL_ADDRESS)
  const metadata = await contract.aggregate(
    erc721.functions.tokenURI,
    collection,
    tokenIds,
    MULTICALL_BATCH_SIZE
  )

  return metadata
}


