import { CollectionEntity, CollectionType } from "./model";

// https://sphere.market/immutable/collection/0x4cd9d7819c01c85F0130Aef429ab32D0465672A2
// export enum Contracts {
//   LizardLabs = "0x4cd9d7819c01c85f0130aef429ab32d0465672a2",
//   SuperPets = "0xb2155a27832ae6d61e6041e13e8c7421ae025d64",
// }

// export const ContractsMap: Record<Contracts, any> = {
//   [Contracts.LizardLabs]: toMap(
//     "Lizard Labs: Infinite Artifacts",
//     "ARTIFACTS",
//     429,
//     "0x612D0C4b92a079D7603C2D898128a72262A141B3",
//     "ipfs://QmXGdgcG2zsn2e5GykewBqKUN3QMgv4AFHsSxyNHzS5XAo",
//   ),
//   [Contracts.SuperPets]: toMap(
//     "SuperPets",
//     "SPZT",
//     45,
//     "0x612D0C4b92a079D7603C2D898128a72262A141B3",
//     "https://mt-test-2.s3.ap-southeast-2.amazonaws.com/metadata/contract-metadata/contract.json",
//   ),
//   // [Contracts.Veggies]: toMap('zkVeggies', 'ZKV', 1545, '0xb3306534236f12dcf2190488e046a359c9167fb0', 'bafkreidvvvgobvz6pb66rzbehfipelmi5q6xpblexy25hu5x3z7w6ejhna'),
// };

// https://docs.subsquid.io/sdk/resources/evm/proxy-contracts/
export enum Contracts {
  Conjunto = "0x25194dfc7981d8a13367fe19b5b1c5fc010d535f",
  Bloquinhos = "0x3c93690bbe585475fdfadab3f59b4604008c7ac4",
  Memories = "0x3c549c45588fb42a94ca7b84081df43d95952c01",
  Vortices = "0x1b60a7ee6bba284a6aafa1eca0a1f7ea42099373",
  Higher = "0x0b6504d95f9d550d274468fb6de5d13b7e64aa6a",
}

export const ContractsMap: Record<Contracts, any> = {
  [Contracts.Conjunto]: toMap(
    "Conjunto",
    "CNJT",
    50,
    "0x22D02786f813A70c5699621810D0ea85efA07332",
    "https://arweave.net/btZcKjV2qZ5OGxQm02h6rCcK1MY6bV6JYKV30Vr1ipM",
  ),
  [Contracts.Bloquinhos]: toMap(
    "Bloquinhos",
    "CNTRCT",
    120,
    "0x22D02786f813A70c5699621810D0ea85efA07332",
    "https://arweave.net/brcg0wOzdEIjwBswDdt2nTjsl0-8FJNtQaiKCwaOMqQ ",
  ),
  [Contracts.Memories]: toMap(
    "Memories",
    "MS",
    35,
    "0x35dFa1Dbb4b8e82E8a924C53E3649112E45a05F4",
    "https://arweave.net/UIV7b488550HzoAdpwRO7laTUDq9VPOD0YEP8sQfkaU",
  ),
  [Contracts.Vortices]: toMap(
    "Vortices",
    "VTX",
    128,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreicthpidyo3gznp3uuezvweiur7xcbo5qcwgw3x4teui2psoqxxbgq",
  ),
  [Contracts.Higher]: toMap(
    "Higher",
    "↑",
    256,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreickjpqtqulirvugyqupeogbvum2uqsrp5focif5427fd2fzgywo4u",
  ),
};

export const contractList: string[] = Object.keys(ContractsMap);

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
