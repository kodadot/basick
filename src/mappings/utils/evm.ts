import { BlockHeader } from '@subsquid/evm-processor'
import { Context, Log } from './types'
import { EventRecord, LogEvent } from '../../abi/abi.support'


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