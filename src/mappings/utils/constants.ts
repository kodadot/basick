import { Contracts } from "../../processable"

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
export const KODA_MINTER_ADDRESS = '0xe844b2a0a6453250c920bd2b4b7741946ab16c08';

// https://explorer.zksync.io/address/0xF9cda624FBC7e059355ce98a31693d299FACd963#contract
// https://www.multicall3.com/deployments
export const MULTICALL_ADDRESS = '0xca11bde05977b3631167028862be2a173976ca11'
export const MULTICALL_BATCH_SIZE = 100

export const BASE_URI_MAP: Record<Partial<Contracts>, string> = {
  // [Contracts.LizardLabs]: 'ipfs://QmU1XwYQ79WQmS87e1UCt5F2EDEaiLdGHb22As9A5UminY/',
  // [Contracts.SuperPets]: 'https://mt-test-2.s3.ap-southeast-2.amazonaws.com/metadata/',
  [Contracts.Conjunto]: 'https://highlight-creator-assets.highlight.xyz/main/base-dir/b499ce45-3e8f-413e-93a2-74c46c23a93e/onChainDir/',
  [Contracts.Bloquinhos]: 'https://highlight-creator-assets.highlight.xyz/main/base-dir/ab2b46e3-156a-41de-bc89-8018aa057237/onChainDir/',
  [Contracts.Memories]: 'https://highlight-creator-assets.highlight.xyz/main/base-dir/e9cba8ba-21a4-4468-9813-a3fca52bb53e/onChainDir/',
  [Contracts.Vortices]: 'https://dyndata.deno.dev/base/content/0x1b60a7ee6bba284a6aafa1eca0a1f7ea42099373/',
  [Contracts.Higher]: 'https://dyndata.deno.dev/base/content/0x0b6504d95f9d550d274468fb6de5d13b7e64aa6a/',
  [Contracts.Unfoldings]: 'https://dyndata.deno.dev/base/content/0xc029b380f8a451cfd9e5124fa9fcad4397b8c119/',
}
