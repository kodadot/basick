
import { merge } from '@kodadot1/metasquid'
import { getOptional } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE } from '../../model'
import { createEvent } from '../shared/event'
import { handleMetadata } from '../shared/metadata'
import { contractOf, toBaseEvent } from '../utils/extract'
import { pending, success, warn } from '../utils/logger'
import { CollectionStateUpdate, Context, eventFrom, Log } from '../utils/types'
import { ContractMetadataUpdate, safeDecode7572Update } from './utils'

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
  const event = safeDecode7572Update(context)
  const final = await getOptional(process.store, CE, contract)

  if (!event) {
    warn(OPERATION, `[COLLECTION/${OPERATION}]: ${contract} wrong event`)
    return
  }

  if (!final) {
    warn(OPERATION, `[COLLECTION/${OPERATION}]: ${contract} not found`)
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