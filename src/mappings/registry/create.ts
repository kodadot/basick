import { create } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { CollectionEntity } from '../../model'
import { createEvent } from '../shared/event'
import { contractOf, toBaseEvent } from '../utils/extract'
import { Action, CollectionStateUpdate, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
// import { Transfer } from './utils'

const OPERATION = Action.CREATE

export function handleCollectionCreate({ creator, owner, maxSupply, metadata, version }: any, context: Log): CollectionStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  return {
    id: contract,
    contract,
    interaction: OPERATION,
    event: createEvent(contract, eventFrom(OPERATION, base, '')),
    state: {
      blockNumber: BigInt(base.blockNumber),
      // burned: false,
      createdAt: base.timestamp,
      currentOwner: owner,
      distribution: 0,
      floor: BigInt(0),
      hash: md5(contract),
      highestSale: BigInt(0),
      issuer: creator,
      max: maxSupply,
      metadata,
      nftCount: 0,
      ownerCount: 0,
      supply: 0,
      updatedAt: base.timestamp,
      volume: BigInt(0),
      version
    },
    applyTo(collection): CollectionEntity {
      const final = create(CollectionEntity, contract, { ...collection, ...this.state })
      // this.event.collection = final
      return final
    }
  }
}