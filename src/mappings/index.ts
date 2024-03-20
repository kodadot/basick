import { create } from '@kodadot1/metasquid/entity'
import { logger } from '@kodadot1/metasquid/logger'
import { Optional } from '@kodadot1/metasquid/types'
import * as erc721 from '../abi/ERC721'
import { Multicall } from '../abi/multicall'
import { CollectionEntity as CE, MetadataEntity, NFTEntity as NE } from '../model'
import { Contracts } from '../processable'
import { handler as handle721Token } from './erc721'
import { ERC721_TRANSFER } from './erc721/utils'
import { handleMetadata } from './shared/metadata'
import { BASE_URI_MAP, MULTICALL_ADDRESS, MULTICALL_BATCH_SIZE } from './utils/constants'
import { findByIdListAsMap } from './utils/entity'
import { lastBatchBlock } from './utils/evm'
import { finalizeCollections } from './utils/lookups'
import { BlockData, Context, EnMap, EventEntity, ItemStateUpdate, Log, createTokenId } from './utils/types'
import { groupedItemsByCollection, uniqueEntitySets } from './utils/unique'

export async function mainFrame(ctx: Context): Promise<void> {
  logger.info(`Processing ${ctx.blocks.length} blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`)
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

  logger.info(`Found ${items.length} items`)

  const { contracts, tokens } = uniqueEntitySets(items)
  const collections = await finalizeCollections(contracts, ctx)
  const finish = await whatToDoWithTokens({ tokens, collections, items }, ctx)
  const complete = await completeTokens(ctx, finish)


  logger.info(`Batch completed, ${complete.length} tokens saved`)
}

function unwrapLog(log: Log, block: BlockData) {
  switch (log.topics[0]) {
    case ERC721_TRANSFER:

      if (![Contracts.Conjunto, Contracts.Bloquinhos, Contracts.Memories].includes(log.address as Contracts)) {
        return null
      }
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
    logger.debug(`APPLY ${item.interaction} on ${item.id}`)
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

  await ctx.store.upsert(values)
  await ctx.store.save(events)

  return knownTokens
}

// TODO: do only if event was mint.
async function completeTokens(ctx: Context, tokenMap: EnMap<NE>) {
  const collections = groupedItemsByCollection(tokenMap.keys())
  const final: NE[] = []
  const metadataFutures: Promise<Optional<MetadataEntity>>[] = []

  for (const [contract, ids] of collections.entries()) {
    const list = Array.from(ids)
    const tokens = await baseUriMetadataFetch(ctx, contract, list)
    for (const [i, id] of list.entries()) {
      const realId = createTokenId(contract, id)
      const token = tokenMap.get(realId)!
      if (!token.metadata) {
        const metadata = tokens[i]
        token.metadata = metadata
        const getMeta = handleMetadata(metadata, ctx.store).then(m => {
          if (m) {
            token.meta = m
            token.name = m.name
            token.image = m.image
            token.media = m.animationUrl
          }

          return m
        })
        metadataFutures.push(getMeta)
        final.push(token)
      }
    }
  }

  const metaList = await Promise.all(metadataFutures)
  const filtered = metaList.filter(m => m) as MetadataEntity[]
  logger.debug(`Saving ${filtered.length} metadata`)
  await ctx.store.save(filtered)

  await ctx.store.save(final)
  return final
}
// Multicall does not exist in Immutable
async function _multicallMetadataFetch(ctx: Context, collection: string, tokens: Array<string>): Promise<string[]> {
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

async function baseUriMetadataFetch(_ctx: Context, collection: string, tokens: Array<string>): Promise<string[]> {
  const baseUri = BASE_URI_MAP[collection as Contracts]
  if (!baseUri) {
    console.error(`No base URI for ${collection}`)
    return []
  }
  const metadata = tokens.map((id) => `${baseUri}${id}`)
  return metadata
}
