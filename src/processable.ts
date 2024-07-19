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
  Vortices = "0x1b60a7ee6bba284a6aafa1eca0a1f7ea42099373",
  Higher = "0x0b6504d95f9d550d274468fb6de5d13b7e64aa6a",
  Unfoldings = "0xc029b380f8a451cfd9e5124fa9fcad4397b8c119",
  Basescapes = "0xd9a2c93ba2e9fae10fe762a42ee807bbf95764cc",
  Concordante = "0x2cc76e51c4ae3ed7b0dcada34c1ea4fe059d5881",
  Etchings = "0x439dfafd1d07c03f8ce332af17c2d80772d63ecb", 
  Pixels = "0xc815823d86715fc9355c79252711f61087b39b39",
  Estrutura = "0xbbf5c72ac002f4f6e074c7ad47fd278deb5c740e",
  // Test Collections
  Quadz = "0x61fa91bc4df01c199f2c9576a2fe10ea206a55e1",
}

export const ContractsMap: Record<Contracts, any> = {
  [Contracts.Basescapes]: toMap(
    "Basescapes",
    "Basescapes",
    32,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreicljf6qmoula5u3l4jgrdilias6ucd54cecp7nw4iq2zeoesfee3e",
  ),
  [Contracts.Concordante]: toMap(
    "Concordante",
    "Concordante",
    32,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreihrimjuyxj7wccnkwgqa2f2n5snyfvp2wdhd5xjokhnqsvs2duxy4",
  ),
  [Contracts.Etchings]: toMap(
    "Etchings",
    "Etchings",
    32,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreig4jgda4bc5pmxft2je34xrtsf5h3r6mvgkospgef6bp2f2qajqye",
  ),
  [Contracts.Pixels]: toMap(
    "Pixels",
    "Pixels",
    32,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreibgyne6c5rebhhm2pmodreqddoqlnctpwds7a2q44fnx64wwih4nq",
  ),
  [Contracts.Estrutura]: toMap(
    "ESTRUTURA",
    "ESTRUTURA",
    32,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreibhgpovdknmpmzyljmqmzbhqcqnnqselzdvp52i6j4eqwdka6w6me",
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
  [Contracts.Unfoldings]: toMap(
    "Unfoldings",
    "UNFLD",
    128,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://bafkreib5pt53graj4wexhpgj3qrl37m3bsgjf3hz5muogqccdtutaq2huq",
  ),
  [Contracts.Quadz]: toMap(
    "Quadz",
    "QDZ",
    256,
    "0xE844b2a0a6453250c920BD2b4B7741946aB16C08",
    "ipfs://QmPyi8YmfjgktC3UGNiV1naeGK6Cg8rRxnNZRfCErpjf8g",
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
    version: 721,
  };
}
