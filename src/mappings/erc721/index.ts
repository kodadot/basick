import { BlockData, Log } from '../utils/types'
import { handleTokenBurn } from './burn'
import { handleTokenCreate } from './mint'
import { handleTokenTransfer } from './transfer'
import { decode721Transfer, isBurn, isMint } from './utils'

export function handler(log: Log, block: BlockData) {
  const transfer = decode721Transfer(log)

  if (isMint(transfer)) {
    return handleTokenCreate(transfer, log)
  }

  if (isBurn(transfer)) {
    return handleTokenBurn(transfer, log)
  }

  return handleTokenTransfer(transfer, log)
}
