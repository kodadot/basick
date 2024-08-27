import { Contracts } from "../../processable"

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
export const KODA_MINTER_ADDRESS = '0xe844b2a0a6453250c920bd2b4b7741946ab16c08';

// https://explorer.zksync.io/address/0xF9cda624FBC7e059355ce98a31693d299FACd963#contract
// https://www.multicall3.com/deployments
export const MULTICALL_ADDRESS = '0xca11bde05977b3631167028862be2a173976ca11'
export const MULTICALL_BATCH_SIZE = 100

export const BASE_URI_MAP: Record<Partial<Contracts>, string> = {
  [Contracts.Vortices]: 'https://dyndata.deno.dev/base/content/0x1b60a7ee6bba284a6aafa1eca0a1f7ea42099373/',
  [Contracts.Higher]: 'https://dyndata.deno.dev/base/content/0x0b6504d95f9d550d274468fb6de5d13b7e64aa6a/',
  [Contracts.Unfoldings]: 'https://dyndata.deno.dev/base/content/0xc029b380f8a451cfd9e5124fa9fcad4397b8c119/',
  [Contracts.Basescapes]: 'https://dyndata.deno.dev/base/content/0xd9a2c93ba2e9fae10fe762a42ee807bbf95764cc/',
  [Contracts.Concordante]: 'https://dyndata.deno.dev/base/content/0x2cc76e51c4ae3ed7b0dcada34c1ea4fe059d5881/',
  [Contracts.Etchings]: 'https://dyndata.deno.dev/base/content/0x439dfafd1d07c03f8ce332af17c2d80772d63ecb/',
  [Contracts.Pixels]: 'https://dyndata.deno.dev/base/content/0xc815823d86715fc9355c79252711f61087b39b39/',
  [Contracts.Estrutura]: 'https://dyndata.deno.dev/base/content/0xbbf5c72ac002f4f6e074c7ad47fd278deb5c740e/',
  [Contracts.Quadz]: 'https://dyndata.koda.art/v1/metadata/base/0x8e985d2804d2d4d9e7b2aad0e4a2f35212e5420a/',
}