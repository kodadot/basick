import { BlockHeader } from '@subsquid/evm-processor'
import { Context, Log } from './types'


export function topicOf(ctx: Log): string {
  return ctx.topics[0]
}

export function lastBatchBlock(ctx: Context): BlockHeader {
  return ctx.blocks[ctx.blocks.length - 1].header
}