import { create } from '@kodadot1/metasquid/entity'
import { EnMap, ItemStateUpdate } from './types'
import { CollectionEntity as CE, NFTEntity as NE } from '../../model'

// return Maps instead of Sets because then we can  
export function uniqueEntities<T extends ItemStateUpdate>(items: T[]) {
  // const contracts = new Set<string>(items.map((i) => i.contract))
  // const tokens = new Set<string>(items.map((i) => i.id))
  const contracts = new EnMap<CE>()
  const tokens = new EnMap<NE>()

  for (const item of items) {
    contracts.set(item.contract, create(CE, item.contract, {}))
    tokens.set(item.contract, create(NE, item.id, {}))
  }
  

  return {
    contracts,
    tokens,
  }
}

export function uniqueEntitySets<T extends ItemStateUpdate>(items: T[]) {
  const contracts = new Set<string>(items.map((i) => i.contract))
  const tokens = new Set<string>(items.map((i) => i.id))
 

  return {
    contracts,
    tokens,
  }
}

export function groupedItemsByCollection(items: IterableIterator<string>) {
  const collections = new Map<string, Set<string>>()

  for (const item of items) {
    const [contract, id] = item.split('-')
    const collection = collections.get(contract) ?? new Set<string>()
    collection.add(id)
    collections.set(contract, collection)
  }

  return collections
}