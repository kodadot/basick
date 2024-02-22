import { Contracts } from "../../processable"

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

// https://explorer.zksync.io/address/0xF9cda624FBC7e059355ce98a31693d299FACd963#contract
// https://www.multicall3.com/deployments
export const MULTICALL_ADDRESS = '0xF9cda624FBC7e059355ce98a31693d299FACd963'
export const MULTICALL_BATCH_SIZE = 100

export const BASE_URI_MAP: Record<Partial<Contracts>, string> = {
  [Contracts.LizardLabs]: 'ipfs://QmU1XwYQ79WQmS87e1UCt5F2EDEaiLdGHb22As9A5UminY/',
  [Contracts.SuperPets]: 'https://mt-test-2.s3.ap-southeast-2.amazonaws.com/metadata/',
}
