import { getOrCreate } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { CollectionEntity as CE, CollectionType } from '../../model'
import { handleMetadata } from '../shared/metadata'
import { contractOf, unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, Log } from '../utils/types'
import { getCreateCollectionEvent } from './getters'


const OPERATION = Action.CREATE

export async function handleCollectionAdd(context: Log, process: Context): Promise<void> {
  pending(OPERATION, `[COLECTTION++]: ${context.block.height}`)
  const event = unwrap(context, getCreateCollectionEvent)
  const final = await getOrCreate(process.store, CE, event.collection, {})

  final.blockNumber = BigInt(event.blockNumber)
  // final.burned = false
  final.createdAt = event.timestamp
  final.currentOwner = event.owner
  final.distribution = 0
  final.floor = BigInt(0)
  final.hash = md5(event.collection)
  final.highestSale = BigInt(0)
  final.id = contractOf(event.collection)
  final.issuer = event.caller
  final.max = Number(event.info.maxSupply) ?? undefined
  final.metadata = event.info.contractURI
  final.baseUri = event.info.baseURI
  final.nftCount = 0
  final.ownerCount = 0
  final.supply = 0
  final.symbol = event.info.symbol
  final.updatedAt = event.timestamp
  final.volume = BigInt(0)
  final.version =  721 //CollectionType.ERC721
  final.type = CollectionType.ERC721

  debug(OPERATION, { metadata: final.metadata })

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, process.store)
    final.meta = metadata
    final.name = metadata?.name
    final.image = metadata?.image
    final.media = metadata?.animationUrl
  }

  await process.store.save(final)
  success(OPERATION, `[COLLECTION] ${final.id}`)
}
