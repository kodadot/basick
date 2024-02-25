import { CollectionEntity, CollectionType } from "./model";

// https://sphere.market/immutable/collection/0x4cd9d7819c01c85F0130Aef429ab32D0465672A2
export enum Contracts {
  LizardLabs = "0x4cd9d7819c01c85f0130aef429ab32d0465672a2",
  SuperPets = "0xb2155a27832ae6d61e6041e13e8c7421ae025d64",
}

export const ContractsMap: Record<Contracts, any> = {
  [Contracts.LizardLabs]: toMap(
    "Lizard Labs: Infinite Artifacts",
    "ARTIFACTS",
    429,
    "0x612D0C4b92a079D7603C2D898128a72262A141B3",
    "ipfs://QmXGdgcG2zsn2e5GykewBqKUN3QMgv4AFHsSxyNHzS5XAo",
  ),
  [Contracts.SuperPets]: toMap(
    "SuperPets",
    "SPZT",
    45,
    "0x612D0C4b92a079D7603C2D898128a72262A141B3",
    "https://mt-test-2.s3.ap-southeast-2.amazonaws.com/metadata/contract-metadata/contract.json",
  ),
  // [Contracts.Veggies]: toMap('zkVeggies', 'ZKV', 1545, '0xb3306534236f12dcf2190488e046a359c9167fb0', 'bafkreidvvvgobvz6pb66rzbehfipelmi5q6xpblexy25hu5x3z7w6ejhna'),
};

function toMap(
  name: string,
  _symbol: string,
  max: number,
  issuer: string,
  meta: string,
  type: CollectionType = CollectionType.ERC721,
): Partial<CollectionEntity> {
  return {
    name,
    // symbol,
    max,
    type,
    metadata: meta || undefined,
    currentOwner: issuer,
    issuer,
    updatedAt: new Date(),
    createdAt: new Date(),
    distribution: 0,
    floor: BigInt(0),
    highestSale: BigInt(0),
    nftCount: 0,
    ownerCount: 0,
    supply: max,
    volume: BigInt(0),
    version: 1
  };
}
