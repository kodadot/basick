import { create } from '@kodadot1/metasquid/entity'
import { logger } from '@kodadot1/metasquid/logger'
import { Optional } from '@kodadot1/metasquid/types'
import * as erc721 from '../abi/ERC721'
import { Multicall } from '../abi/multicall'
import { ENV_CONTRACTS, PREINDEX_BLOCK } from '../environment'
import { CollectionEntity as CE, Interaction, MetadataEntity, NFTEntity as NE } from '../model'
import { Contracts, contractList } from '../processable'
import { ERC721_TRANSFER, handler as handle721Token } from './erc721'
import { ERC7572_CONTRACT_URI, handler as handle7572Metadata } from './erc7572'
import { REGISTRY } from './registry'
import { forceCollectionCreate, handleCollectionAdd } from './registry/add'
import { handleMetadata } from './shared/metadata'
import { BASE_URI_MAP, MULTICALL_ADDRESS, MULTICALL_BATCH_SIZE } from './utils/constants'
import { findByIdListAsMap } from './utils/entity'
import { lastBatchBlock, mainTopic } from './utils/evm'
import { finalizeCollections } from './utils/lookups'
import { BlockData, Context, EnMap, EventEntity, ItemStateUpdate, Log, createTokenId } from './utils/types'
import { groupedItemsByCollection, uniqueEntitySets } from './utils/unique'
import { handleSingleTokenRegister } from './registry/mint'

export async function mainFrame(ctx: Context): Promise<void> {
  logger.info(`Processing ${ctx.blocks.length} blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`)

  if (ctx.blocks[0].header.height === PREINDEX_BLOCK) {
    const cached = contractList.map(forceCollectionCreate).filter(Boolean) as CE[]
    await ctx.store.save(cached)
    console.log(`Cached ${cached.length} collections`)
  }

  const items = []

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      if (log.address === ENV_CONTRACTS.REGISTRY && mainTopic(log) === REGISTRY.COLLECTION_REGISTERED) {
        await handleCollectionAdd(log, ctx)
      } else {
        const item = unwrapLog(log, block)
        if (item) {
            items.push(item)
          }
      }
    }
  }

  if (items.length === 0) {
    return
  }

  logger.info(`Found ${items.length} items`)

  const { contracts, tokens } = uniqueEntitySets(items)
  const collections = await finalizeCollections(contracts, ctx)
  
  if (collections.size > 0) {
    const finish = await whatToDoWithTokens({ tokens, collections, items }, ctx)
    logger.info(`Batch completed, ${finish.size} tokens saved`)
  } else {
    logger.info(`Batch empty`)
  }

}

function unwrapLog(log: Log, block: BlockData): ItemStateUpdate | null {
  if (log.address === ENV_CONTRACTS.REGISTRY && mainTopic(log) === REGISTRY.TOKEN_REGISTERED) {
    return handleSingleTokenRegister(log, block)
  }

  if (mainTopic(log) == ERC721_TRANSFER) {
    return handle721Token(log, block)
  }

  // if (mainTopic(log) == ERC7572_CONTRACT_URI) {
  //   return handle7572Metadata(log, block)
  // }

  console.log('unknown log', mainTopic(log))
  return null
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
  console.log('whatToDoWithTokens', tokens.size)
  const knownTokens = await findByIdListAsMap(ctx.store, NE, tokens)
  const events: EventEntity[] = []
  const metadataEntities: MetadataEntity[] = []
  const collectionsToSave: Set<string> = new Set()

  for (const item of items) {
    if (!collections.has(item.contract)) {
      // logger.debug(`${item.contract} NOT FOUND --> SKIP event ${item.interaction} on ${item.id}`)
      continue
    }

    logger.debug(`APPLY ${item.interaction} on ${item.id}`)
    let knownToken = knownTokens.get(item.id) ?? create(NE, item.id, {})

    if (item.applyFrom) {
      const collection = collections.get(item.contract)!
      item.applyFrom(collection)
      collectionsToSave.add(item.contract)
    }
    if (item.applyTo) {
      knownToken = item.applyTo(knownToken)
    }

    if (item.interaction === Interaction.MINT && knownToken.metadata) {
      const metadata = await handleMetadata(knownToken.metadata, ctx.store)
      if (metadata) {
        knownToken.meta = metadata
        knownToken.name = metadata?.name
        knownToken.image = metadata?.image
        knownToken.media = metadata?.animationUrl

        metadataEntities.push(metadata)
      }  
    }

    events.push(item.event)
    knownTokens.set(item.id, knownToken)
  }

  const values = [...knownTokens.values()]

  await ctx.store.upsert(values)
  await ctx.store.save(events)

  if (collectionsToSave.size > 0) {
    const toUpsert = [...collectionsToSave.values()].map(id => collections.get(id)!)
    await ctx.store.save(toUpsert)
  }

  if (metadataEntities.length > 0) {
    await ctx.store.save(metadataEntities)
  }

  return knownTokens
}

async function _enrichTokenMapWithMetadata(ctx: Context, tokenMap: EnMap<NE>) {
  const metadataFutures: Promise<Optional<MetadataEntity>>[] = []
  const final: NE[] = []

  for (const token of tokenMap.values()) {
    if (token.metadata) {
      const getMeta = handleMetadata(token.metadata, ctx.store).then(m => {
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

  const metaList = await Promise.all(metadataFutures)
  const filtered = metaList.filter(m => m) as MetadataEntity[]

  logger.debug(`Saving ${filtered.length} metadata`)
  await ctx.store.save(filtered)

  await ctx.store.save(final)
  return final
}

// TODO: do only if event was mint.
async function _completeTokens(ctx: Context, tokenMap: EnMap<NE>) {
  const collections = groupedItemsByCollection(tokenMap.keys())
  const final: NE[] = []
  const metadataFutures: Promise<Optional<MetadataEntity>>[] = []

  for (const [contract, ids] of collections.entries()) {
    const list = Array.from(ids)
    const tokens = await _multicallMetadataFetch(ctx, contract, list)
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
  const tokenIds = tokens.map((id) => ({ tokenId: BigInt(id) }))
  const contract = new Multicall(ctx, lastBatchBlock(ctx), MULTICALL_ADDRESS)
  const metadata = await contract.aggregate(
    erc721.functions.tokenURI,
    collection,
    tokenIds,
    MULTICALL_BATCH_SIZE
  )

  return metadata
}

async function _baseUriMetadataFetch(_ctx: Context, collection: string, tokens: Array<string>): Promise<string[]> {
  const baseUri = BASE_URI_MAP[collection as Contracts]
  if (!baseUri) {
    console.error(`No base URI for ${collection}`)
    return []
  }
  const metadata = tokens.map((id) => `${baseUri}${id}`)
  return metadata
}
