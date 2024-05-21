import { create } from '@kodadot1/metasquid/entity'
import { Optional } from '@kodadot1/metasquid/types'

import type { Content } from '@kodadot1/hyperdata'
import { logger } from '@kodadot1/metasquid/logger'
import { Store } from '@subsquid/typeorm-store'
import md5 from 'md5'
import { MetadataEntity as Metadata } from '../../model/generated'
import { fetchMetadata } from '../utils/metadata'

export async function handleMetadata(id: string, store: Store): Promise<Optional<Metadata>> {
  const meta = await store.get(Metadata, id) // await get<Metadata>(store, Metadata, id)
  if (meta) {
    return meta
  }

  const start = Date.now()
  const logId = id.split('/').slice(-1).at(0)
  logger.info(`▶️ [META] ${logId}`)
  const metadata = await fetchMetadata<Content>(id)
  if (!metadata) {
    return undefined
  }

  const partial: Partial<Metadata> = {
    id: md5(id),
    description: metadata.description || '',
    image: metadata.image || metadata.thumbnail,
    animationUrl: metadata.animationUrl,
    attributes: [], // metadata.attributes?.map(attributeFrom) || [],
    name: metadata.name || '',
    type: metadata.type || '',
    // banner: metadata.banner || '',
  }

  const final = create<Metadata>(Metadata, id, partial)
  await store.save(final)
  const elapsed = (Date.now() - start) / 1000
  const message = `⏱ [META] ${logId} ${elapsed}s`
  if (elapsed >= 30) {
    logger.warn(message)
  } else {
    logger.info(message)
  }
  return final
}
