import { ensure } from '@kodadot1/metasquid'
import { $obtain } from '@kodadot1/minipfs'
import logger from './logger'
// import { attributeFrom } from './types'
export const BASE_URL = 'https://image.w.kodadot.xyz/'

export const fetchMetadata = async <T>(metadata: string): Promise<T | undefined> => {
  try {
    if (!metadata) {
      return undefined;
    }
    return await $obtain<T>(metadata, ['rmrk', 'infura_kodadot1'])
  } catch (e) {
    logger.error(`[MINIPFS] ${e}}`)
  }

  return undefined
}