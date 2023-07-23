import md5 from 'md5'
import { contractOf, toBaseEvent, unwrap } from '../utils/extract'
import { Action, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { Transfer } from './utils'
import { NFTEntity } from '../../model'
import { create } from '@kodadot1/metasquid/entity'

const OPERATION = Action.MINT

export function handleTokenCreate({ to, tokenId }: Transfer, context: Log): ItemStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  const id = createTokenId(contract, tokenId)
  return {
    id,
    contract,
    state: {
      currentOwner: to,
      updatedAt: base.timestamp,
      createdAt: base.timestamp,
      blockNumber: BigInt(base.blockNumber),
      hash: md5(id),
      sn: tokenId.toString(),
      price: 0n,
      burned: false,
      lewd: false,
      version: 721
    },
    interaction: OPERATION,
    event: eventFrom(OPERATION, base, to),
    applyTo(item): NFTEntity {
      return create(NFTEntity, id, { ...item, ...this.state })
    },
    applyFrom(collection) {
      this.state = {
        ...this.state,
        collection,
        issuer: collection.issuer,
      }

      return collection
    }
  }
}
