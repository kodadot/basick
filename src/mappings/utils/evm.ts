import { BlockHeader } from '@subsquid/evm-processor'
import { Context, Log } from './types'
import { EventRecord, LogEvent } from '../../abi/abi.support'
import { Optional } from '@kodadot1/metasquid/types'


export function topicOf<T>(ctx: LogEvent<T>): string {
  return ctx.topic
}

export function decode<T>(ctx: LogEvent<T>, record: EventRecord): T {
  return ctx.decode(record)
}

export function mainTopic(ctx: Log): string {
  return ctx.topics[0]
}

export function lastBatchBlock(ctx: Context): BlockHeader {
  return ctx.blocks[ctx.blocks.length - 1].header
}

export function tokenUri(baseUri: Optional<string>, tokenId: Optional<string>): string {
  if (!baseUri || !tokenId) {
    return ''
  }
  const uri = baseUri.endsWith('/') ? baseUri : `${baseUri}/`
  return `${uri}${tokenId}`
}

export function tokenName(baseName: Optional<string>, tokenId: Optional<string>): string {
  if (!baseName || !tokenId) {
    return ''
  }
  return `${baseName} #${tokenId}`
}