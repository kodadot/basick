
import { BaseCall, CallWith, Log as Context, UnwrapFunc } from './types'


export function toBaseEvent(context: Context): BaseCall {
  // const caller = addressOf(context.event.extrinsic.signature?.address) 
  const caller = ''
  const blockNumber = context.block.height.toString();
  const timestamp = new Date(context.block.timestamp);

  return { caller, blockNumber, timestamp };
}

export function contractOf(event: Context): string {
  return event.address
}


export function unwrap<T>(ctx: Context, unwrapFn: UnwrapFunc<T>): CallWith<T> {
  const baseCall = toBaseEvent(ctx);
  const unwrapped = unwrapFn(ctx);
  return { ...baseCall, ...unwrapped };
}