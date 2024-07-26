import { merge } from '@kodadot1/metasquid'
import { createEvent } from '../shared/event'
import { contractOf, toBaseEvent } from '../utils/extract'
import { Action, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { Transfer } from './utils'

const OPERATION = Action.BURN

export function handleTokenBurn({ tokenId }: Transfer, context: Log): ItemStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  const id = createTokenId(contract, tokenId)
  
  return {
    id: createTokenId(contract, tokenId),
    contract,
    state: {
      burned: true,
      updatedAt: base.timestamp,
      price: 0n
    },
    interaction: OPERATION,
    event: createEvent(id, eventFrom(OPERATION, base, '')),
    applyTo(item) {
      const final = merge(item, this.state)
      this.event.nft = final
      return final
    },
    applyFrom(collection) {
      // update collection
      collection.supply -= 1
      return collection
    }
  }

}