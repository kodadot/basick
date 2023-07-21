import { contractOf, toBaseEvent, unwrap } from '../utils/extract'
import { Action, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { Transfer } from './utils'

const OPERATION = Action.BURN

export function handleTokenBurn({ tokenId }: Transfer, context: Log): ItemStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  return {
    id: createTokenId(contract, tokenId),
    contract,
    state: {
      burned: true,
      updatedAt: base.timestamp,
      price: 0n
    },
    interaction: OPERATION,
    event: eventFrom(OPERATION, base, '')
  }

}