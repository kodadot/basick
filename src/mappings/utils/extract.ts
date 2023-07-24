
import { BaseCall, CallWith, Log as Context, UnwrapFunc } from './types'

type Key<T> = keyof T

export function toBaseEvent(context: Context): BaseCall {
  // const caller = addressOf(context.event.extrinsic.signature?.address) 
  const caller = context.transaction?.from.toString() ?? '';
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

export function assign<T extends {}>(item: T, state: Partial<T>): void {
  Object.assign<T, Partial<T>>(item, state)
  // for (const [key, value] of Object.entries<any>(state)) {
  //   item[key as Key<T>] = value as T[keyof T]
  // }
}