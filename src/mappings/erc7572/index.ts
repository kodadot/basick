import { BlockData, Log } from '../utils/types'
import { events } from '../../abi/ERC721'
import { safeDecode7572Update } from './utils'
import { handleMetadataSet } from './setMetadata'

export const ERC7572_CONTRACT_URI = events.ContractURIUpdated.topic

export function handler(log: Log, _block: BlockData) {
  const item = safeDecode7572Update(log)

  if (!item) {
    return null
  }

  return handleMetadataSet(item, log)
}