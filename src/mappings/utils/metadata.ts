import { contentFrom, type Content } from '@kodadot1/hyperdata'
import { $obtain } from '@kodadot1/minipfs'
import logger from './logger'
// import { attributeFrom } from './types'
export const BASE_URL = 'https://image.w.kodadot.xyz/'

export const fetchMetadata = async <T extends Content>(metadata: string): Promise<T | undefined> => {
  try {
    if (!metadata) {
      return undefined;
    }
    const value = await $obtain<T>(metadata, ['kodadot_beta', 'w3s'], true)
    return contentFrom(value as any) as T
  } catch (e) {
    logger.error(`[MINIPFS] ${e}`)
  }

  return undefined
}