
import { Block, Context, Fields, Log, Transaction } from '../../processor'
// export { Fields, Context, Block, Log, Transaction } from '../../processor'

import { BaseBlock } from '@kodadot1/metasquid/types'
import { BlockData } from '@subsquid/evm-processor'
import { Interaction } from '../../model/generated/_interaction'
// import { CollectionEntity, NFTEntity } from '../../model'

export type BaseCall = {
  caller: string
  blockNumber: string
  timestamp: Date
}


// export { Interaction }
export { Block, Context, Fields, Log, Transaction, BlockData }

export function eventFrom<T extends Interaction>(interaction: T, { blockNumber, caller, timestamp }: BaseCall, meta: string, currentOwner?: string): IEvent<T> {
  return {
    interaction,
    blockNumber: BigInt(blockNumber),
    caller,
    currentOwner: currentOwner ?? caller,
    timestamp,
    meta,
  };
}

// export function attributeFrom(attribute: MetadataAttribute): Attribute {
//   return new Attribute({}, {
//     display: String(attribute.display_type),
//     trait: String(attribute.trait_type),
//     value: String(attribute.value),
//   });
// }



// export type Optional<T> = T | null;

export interface IEvent<T  = Interaction> {
  interaction: T;
  blockNumber: bigint,
  caller: string,
  currentOwner: string,
  timestamp: Date,
  meta: string;
}

export type ItemUpdate = Partial<any>
export type CollectionUpdate = Partial<any>


export type UpdateState<T> = {
  id: string, // same as contract if collection of collection-sn if token
  contract: string,
  interaction?: Interaction //IEvent<Interaction>
  state: Partial<T>
  event: any //IEvent<Interaction>
}

export type ItemStateUpdate = UpdateState<any>

export type WithId = {
  id: string
}

export type BaseCollectionEvent = WithCaller & WithId

export type BaseTokenEvent = CollectionId & {
  sn: string
}

export type OptionalMeta = {
  metadata?: string
}

export type CreateCollectionEvent = BaseCollectionEvent &
  OptionalMeta & {
    type: string
  }

export type CreateTokenEvent = BaseTokenEvent &
  WithCount &
  WithCaller & {
    metadata: Promise<string>
  }

export type TransferTokenEvent = BaseTokenEvent & WithCaller & TransferTo

export type BurnTokenEvent = BaseTokenEvent & WithCaller

export type CallWith<T> = BaseCall & T

type TransferTo = {
  to: string
}

type CollectionId = {
  collectionId: string
}

export type EntityConstructor<T> = {
  new (...args: any[]): T
}

export type WithAmount = {
  amount: bigint
}

export type WithCaller = {
  caller: string
}

export type WithBlock = {
  block: BaseBlock
}

export type WithContract = {
  contract: string
}

export type SomethingWithMeta = {
  metadata: string
}

export type SomethingWithOptionalMeta = {
  metadata?: string
}

export type WithCount = {
  count: bigint
}

// export type KeyType = Interaction.MINT | Interaction.MINTNFT | 'REST'
// export type StateMap = Map<KeyType, MetaEvent<KeyType extends Interaction.MINT ? CollectionEntity : NFTEntity>[]>


// export type MetaEvent<T = NFTEntity> = {
//   state: Partial<T>
//   event: IEvent<Interaction>
//   block: BaseBlock
//   // caller: string,
//   id: string,
//   contract: string,
//   interaction: Interaction
// }

export type WithHooks = {
  before?: (ctx: Context) => void | Promise<void>
  after?: (ctx: Context) => void | Promise<void>
}

export type EventExtra = WithBlock & WithCaller & WithContract

export type UnwrapFunc<T> = (ctx: Log) => T
export type SanitizerFunc = (url: string) => string

export function ensure<T>(value: unknown): T {
  return value as T
}

export function createTokenId(collection: string, id: string | bigint): string {
  return `${collection}-${id.toString()}`
}

// export const eventId = (id: string, event: Interaction): string =>
//   `${id}-${event}-${nanoid()}`

export const createOfferId = (id: string, caller: string): string =>
  `${id}-${caller}`

export const tokenIdOf = (base: BaseTokenEvent): string =>
  createTokenId(base.collectionId, base.sn)

export type TokenMetadata = {
  name?: string
  description: string
  external_url?: string
  image: string
  animation_url?: string
  attributes?: MetadataAttribute[]
}

export type MetadataAttribute = {
  display_type?: DisplayType
  trait_type?: string
  value: number | string
}

export enum DisplayType {
  null,
  'boost_number',
  'number',
  'boost_percentage',
}

export { Interaction as Action } from '../../model'
