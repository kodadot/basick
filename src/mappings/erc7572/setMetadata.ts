
import { merge } from '@kodadot1/metasquid'
import { getOptional } from '@kodadot1/metasquid/entity'
import { warn } from 'console'
import { CollectionEntity as CE } from '../../model'
import { createEvent } from '../shared/event'
import { handleMetadata } from '../shared/metadata'
import { contractOf, toBaseEvent } from '../utils/extract'
import { pending, success } from '../utils/logger'
import { CollectionStateUpdate, Context, eventFrom, Log } from '../utils/types'
import { ContractMetadataUpdate, decode7572ContractUpdate } from './utils'

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

export async function handleCollectionMetadataSet(context: Log, process: Context): Promise<void>  {
  pending(OPERATION, `[COLLECTION/${OPERATION}]: ${context.block.height}`)
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  const event = decode7572ContractUpdate(context)
  const final = await getOptional(process.store, CE, contract)

  if (!final) {
    warn(`[COLLECTION/${OPERATION}]: ${contract} not found`)
    return
  }

  const oldMetadata = final.metadata
  final.metadata = event.newContractURI
  final.updatedAt = base.timestamp

  if (oldMetadata !== final.metadata) {
    const metadata = await handleMetadata(final.metadata, process.store)
    final.meta = metadata
    final.name = metadata?.name || final.name
    final.image = metadata?.image || final.image
    final.media = metadata?.animationUrl || final.media
    final.kind = metadata?.kind || final.kind
  }

  await process.store.save(final)
  success(OPERATION, `[COLLECTION/${OPERATION}] ${final.id}`)
}