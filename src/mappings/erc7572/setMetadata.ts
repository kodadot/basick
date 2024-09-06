
import { merge } from '@kodadot1/metasquid'
import { createEvent } from '../shared/event'
import { contractOf, toBaseEvent, unwrap } from '../utils/extract'
import { CollectionStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { ContractMetadataUpdate } from './utils'

const OPERATION = 'METADATA' as any

export function handleMetadataSet({ newContractURI: metadata }: ContractMetadataUpdate, context: Log): CollectionStateUpdate  {
  const contract = contractOf(context)
  const base = toBaseEvent(context)

  return {
    id: contract,
    contract,
    state: {
      metadata,
      updatedAt: base.timestamp,
    },
    interaction: OPERATION,
    event: createEvent(contract, eventFrom(OPERATION, base, metadata)),
    applyTo(collection) {
      const final = merge(collection, this.state)
      return final
    }
  }
}