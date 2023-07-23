import { CollectionEntity, CollectionType } from './model'

export enum Contracts {
  HueNft = '0x6e0bed56fb3eb7d2fecc5bb71f99e844cd3c2a0b',
  Veggies = '0x2b1821df677619ea15f44f703b9d6e3980a1eeff'
}

export const ContractsMap: Record<Contracts, any>  = {
  [Contracts.HueNft]: toMap('HueNft', 'HUE64', 6400, '0xee6a0d688aA4b6a6BCfd4abEfFCB5ff731aFA9A0', 'QmdHdzuWLq8JdhCQKy63uNisWgydatfFNvxwrw8Z66KCNC'),
  [Contracts.Veggies]: toMap('zkVeggies', 'ZKV', 1545, '0xb3306534236f12dcf2190488e046a359c9167fb0', 'bafkreidvvvgobvz6pb66rzbehfipelmi5q6xpblexy25hu5x3z7w6ejhna'),

}

function toMap(name: string, _symbol: string, max: number, issuer: string, meta: string, type: CollectionType = CollectionType.ERC721): Partial<CollectionEntity> {
  return {
    name,
    // symbol,
    max,
    type,
    metadata: meta ? `ipfs://ipfs/${meta}` : undefined,
    currentOwner: issuer,
    issuer,
    updatedAt: new Date(),
    createdAt: new Date(),
  }
}