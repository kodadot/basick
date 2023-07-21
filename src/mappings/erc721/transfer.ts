import { contractOf, toBaseEvent, unwrap } from '../utils/extract'
import { Action, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { Transfer } from './utils'

const OPERATION = Action.SEND

export function handleTokenTransfer({ from, to, tokenId }: Transfer, context: Log): ItemStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  return {
    id: createTokenId(contract, tokenId),
    contract,
    state: {
      currentOwner: to,
      updatedAt: base.timestamp,

    },
    interaction: OPERATION,
    event: eventFrom(OPERATION, base, to, from)
  }
}