import { events as erc721 } from '../../abi/ERC721'
import { Log } from '../utils/types'

export function decode7572ContractUpdate(ctx: Log) {
  return erc721.ContractURIUpdated.decode(ctx)
}

export function safeDecode7572Update(ctx: Log): ContractMetadataUpdate | null {
  const isUpdate = erc721.ContractURIUpdated.is(ctx)
  return isUpdate ? decode7572ContractUpdate(ctx) : null
}

export type ContractMetadataUpdate = ReturnType<typeof decode7572ContractUpdate>