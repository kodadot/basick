import { CollectionEntity as CE } from '../../model'
// import { handleCollectionCreate } from '../erc721/create'
import { findByIdListAsMap } from './entity'
import logger, { debug } from './logger'
import { Context, EnMap } from './types'

export async function finalizeCollections(collectionSet: Set<string>, ctx: Context): Promise<EnMap<CE>> {
  // ctx.store.findBy(CE, {id: In([...collectionMap.keys()])})
  const knownCollections = await findByIdListAsMap(ctx.store, CE, collectionSet)
  debug('finalizeCollections' as any , { knownCollections: knownCollections.size })
  // const newCollections: CE[] = []

  // for (const id of collectionSet) {
  //   const knownCollection = knownCollections.has(id)
  //   if (!knownCollection) {
    
  //     const entity = create(CE, id, {})
  //     const collection = handleCollectionCreate(entity, ctx)
      
  //     newCollections.push(collection)
  //     knownCollections.set(id, collection)
  //   }
  // }

  // await ctx.store.save(newCollections)
  return knownCollections
}
