import { create, getOrCreate } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { CollectionEntity as CE, CollectionType, Kind } from '../../model'
import { handleMetadata } from '../shared/metadata'
import { contractOf, unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, Log } from '../utils/types'
import { getCreateCollectionEvent } from './getters'
import { Contracts, ContractsMap } from '../../processable'
import { BASE_URI_MAP } from '../utils/constants'


const OPERATION = Action.CREATE

export async function handleCollectionAdd(context: Log, process: Context): Promise<void> {
  pending(OPERATION, `[COLECTTION++]: ${context.block.height}`)
  const event = unwrap(context, getCreateCollectionEvent)
  const final = await getOrCreate(process.store, CE, event.collection, {})

  const max = Number(event.info.maxSupply)

  final.blockNumber = BigInt(event.blockNumber)
  // final.burned = false
  final.baseUri = event.info.baseURI
  final.createdAt = event.timestamp
  final.currentOwner = event.owner
  final.distribution = final.distribution || 0
  final.floor = BigInt(0)
  final.hash = md5(event.collection)
  final.highestSale = BigInt(0)
  final.id = contractOf(event.collection)
  final.issuer = event.caller || event.creator
  final.max = max <= Number.MAX_SAFE_INTEGER ? max : undefined
  final.metadata = event.info.contractURI
  final.name = event.info.name
  final.nftCount = final.nftCount || 0
  final.ownerCount = final.ownerCount || 0
  final.supply = final.supply || 0
  final.symbol = event.info.symbol
  final.updatedAt = event.timestamp
  final.volume = final.volume || BigInt(0)
  final.version =  721 //CollectionType.ERC721
  final.type = CollectionType.ERC721

  debug(OPERATION, { metadata: final.metadata })

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, process.store)
    final.meta = metadata
    final.name = metadata?.name || final.name
    final.image = metadata?.image || final.image
    final.media = metadata?.animationUrl || final.media
    final.kind = metadata?.kind || final.kind
  }

  await process.store.save(final)
  success(OPERATION, `[COLLECTION] ${final.id}`)
}


export function forceCollectionCreate(collection: string): CE | undefined {
  const cache =  ContractsMap[collection as Contracts];
  const baseUri = BASE_URI_MAP[collection as Contracts]

  if (cache) {
    return create(CE, collection, {...cache, hash: md5(collection), baseUri })
  }

  return undefined
}