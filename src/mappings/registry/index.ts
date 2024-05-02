import { BlockData, Log } from '../utils/types'
import { events } from '../../abi/Registry'
import { mainTopic } from '../utils/evm'
import { debug, warn } from '../utils/logger'
import { Interaction } from '../../model'
import * as proc from './getters'

export const REGISTRY = {
  COLLECTION_REGISTERED: events.CollectionRegistered.topic,
  COLLECTION_REMOVED: events.CollectionRemoved.topic,
  TOKEN_REGISTERED: events.TokenRegistered.topic,
  TOKEN_LIST_REGISTERED: events.TokenListRegistered.topic,
  MINT_INFO_UPDATED: events.MintInfoUpdated.topic,
  ROYALTY_SET: events.RoyaltySet.topic,
  ATTRIBUTE_SET: events.AttributeSet.topic,
  // PAUSED: events.Paused.topic,
  // UNPAUSED: events.Unpaused.topic,
  // OWNERSHIP_TRANSFERRED: events.OwnershipTransferred.topic,
}


export function handler(log: Log, block: BlockData) {
  switch (mainTopic(log)) {
    case REGISTRY.COLLECTION_REGISTERED: {
      const decoded = proc.getCreateCollectionEvent(log)
      debug(Interaction.CREATE, decoded, true)
      return null
    }
    case REGISTRY.TOKEN_REGISTERED: {
      const decoded = proc.getCreateTokenEvent(log)
      debug(Interaction.MINT, decoded, true)
      return null
    }
    case REGISTRY.TOKEN_LIST_REGISTERED: {
      const decoded = proc.getCreateTokenListEvent(log)
      debug(Interaction.MINT, decoded, true)
      return null
    }
    case REGISTRY.MINT_INFO_UPDATED: {
      const decoded = events.TokenListRegistered.decode(log)
      debug('MINT_INFO_UPDATED' as any, decoded, true)
      return null
    }
    default:
      warn('REGISTRY' as any, 'no such handler')
      return null;
  }
}