import { EMPTY_ADDRESS } from '../utils/constants'
import { Log } from '../utils/types'
import * as erc721 from '../../abi/ERC721'

export const ERC721_TRANSFER = erc721.events.Transfer.topic

export function isMint(transfer: Transfer) {
  return transfer.from === EMPTY_ADDRESS && transfer.to !== EMPTY_ADDRESS
}

export function isBurn(transfer: Transfer) {
  return transfer.to === EMPTY_ADDRESS && transfer.from !== EMPTY_ADDRESS
}

export function isTransfer(transfer: Transfer) {
  return transfer.to !== EMPTY_ADDRESS && transfer.from !== EMPTY_ADDRESS
}

export function decode721Transfer(ctx: Log) {
  return erc721.events.Transfer.decode(ctx)
}

export function getTransferType(transfer: Transfer) {
  if (isMint(transfer)) {
    return 'mint'
  }
  
  if (isBurn(transfer)) {
    return 'burn'
  }

  return 'transfer'
}

export type Transfer = ReturnType<typeof decode721Transfer>
