import { toMap } from '@kodadot1/metasquid'
import { EntityConstructor, EntityWithId } from '@kodadot1/metasquid/types'
import { Store } from '@subsquid/typeorm-store'
import { FindOptionsWhere, In } from 'typeorm'
import { EnMap } from './types'

export function findByIdMapAsMap<T extends EntityWithId>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  idMap: Map<string, unknown>
): Promise<EnMap<T>> {
  const where: FindOptionsWhere<T> = {
    id: In([...idMap.keys()])
  } as FindOptionsWhere<T>
  return store.findBy<T>(entityConstructor, where).then(toMap)
}

export function findByIdListAsMap<T extends EntityWithId>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  idList: Iterable<string>
): Promise<EnMap<T>> {
  const where: FindOptionsWhere<T> = {
    id: In([...idList])
  } as FindOptionsWhere<T>
  return store.findBy<T>(entityConstructor, where).then(toMap)
}