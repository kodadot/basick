import { merge } from '@kodadot1/metasquid'
import { createEvent } from '../shared/event'
import { contractOf, toBaseEvent, unwrap } from '../utils/extract'
import { Action, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { Transfer } from './utils'

const OPERATION = Action.SEND

export function handleTokenTransfer({ from, to, tokenId }: Transfer, context: Log): ItemStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  const id = createTokenId(contract, tokenId)

  return {
    id: createTokenId(contract, tokenId),
    contract,
    state: {
      currentOwner: to,
      updatedAt: base.timestamp,

    },
    interaction: OPERATION,
    event: createEvent(id, eventFrom(OPERATION, base, to, from)),
    applyTo(item) {
      const final = merge(item, this.state)
      this.event.nft = final
      return final
    }
  }
}