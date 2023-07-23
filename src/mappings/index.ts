import { serializer } from '@kodadot1/metasquid'
import { EntityWithId, create } from '@kodadot1/metasquid/entity'
import * as erc721 from '../abi/ERC721'
import { handler as handle721Token } from './erc721'
import { ERC721_TRANSFER } from './erc721/utils'
import { BlockData, Context, EnMap, ItemStateUpdate, Log } from './utils/types'
import { CONTRACT_ADDRESS } from '../processor'
import { CollectionEntity as CE, NFTEntity as NE } from '../model'
import { findByIdListAsMap } from './utils/entity'
import { uniqueEntitySets } from './utils/unique'
import { handleCollectionCreate } from './erc721/create'
import { finalizeCollections } from './utils/lookups'

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

  console.log(JSON.stringify(items, serializer, 2))
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

export async function whatToDoWithTokens({ tokens, collections, items }: What, ctx: Context) {
  // ctx.store.findBy(CE, {id: In([...collectionMap.keys()])})
  const knownTokens = await findByIdListAsMap(ctx.store, NE, tokens)

  for (const item of items) {
    console.log(`APPLY ${item.interaction} on ${item.id}`)
    const knownToken = knownTokens.get(item.id)
    if (knownToken) {
      // update
      // Object.assign(knownToken, item.state)
      knownTokens.set(item.id, { ...knownToken, ...item.state })
    } else {
      let unknownItem = create(NE, item.id, { })
      if (item.applyFrom) {
        const collection = collections.get(item.contract)!
        item.applyFrom(collection)
      }
      if (item.applyTo) {
        unknownItem = item.applyTo(unknownItem)
      }
      
      knownTokens.set(item.id, unknownItem)
    }

  }

  const values = [...knownTokens.values()]
  console.log(JSON.stringify(values, serializer, 2))

  await ctx.store.upsert([...knownTokens.values()])
  await ctx.store.save([...knownTokens.values()])

  return knownTokens
}


