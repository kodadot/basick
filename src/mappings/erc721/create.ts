import { create } from '@kodadot1/metasquid/entity'
import { CollectionEntity } from '../../model'
import { Contracts, ContractsMap } from '../../processable'
import { Context, ItemStateUpdate } from '../utils/types'
import md5 from 'md5'
// import { create } from '@kodadot1/metasquid/entity'
// import md5 from 'md5'
// import { EMPTY_ADDRESS } from '../utils/constants'


// export function initialCollectionState({ event, contract: id }: ItemStateUpdate): Partial<CollectionEntity> {
//   const final = create(CollectionEntity, id, {})

//   final.blockNumber = BigInt(event.blockNumber)
//   final.createdAt = event.timestamp
//   final.currentOwner = EMPTY_ADDRESS
//   // final.distribution = 0
//   // final.floor = BigInt(0)
//   final.hash = md5(id)
//   // final.highestSale = BigInt(0)
//   final.id = event.id
//   final.issuer = EMPTY_ADDRESS
//   final.max = undefined
//   // final.metadata = event.metadata
//   // final.nftCount = 0
//   // final.ownerCount = 0
//   // final.supply = 0
//   final.updatedAt = event.timestamp
//   // final.volume = BigInt(0)
//   // final.version = versionOf(context)


//   return final

// }

export function handleCollectionCreate(collection: CollectionEntity, context: Context): CollectionEntity {
  const cache =  ContractsMap[collection.id as Contracts];

  if (cache) {
    return create(CollectionEntity, collection.id, { ...cache, hash: md5(collection.id) })
  }
  
  return collection
}