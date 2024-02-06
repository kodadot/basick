import { lookupArchive } from '@subsquid/archive-registry'

export type Chain = 'zksync' | 'immutable-zkevm'
export type ChainEnv = 'mainnet' 
// | 'testnet' 
type ChainWithEnv = `${Chain}-${ChainEnv}`
type PossibleChain = ChainWithEnv | `${Chain}-${string}`

export const CHAIN: PossibleChain = process.env.CHAIN as ChainWithEnv || 'immutable-zkevm-testnet'

export const STARTING_BLOCK = Number(process.env.STARTING_BLOCK || 0)

// https://github.com/zkSync-Community-Hub/zksync-developers/discussions/228
const nodes: Record<PossibleChain, string> = {
    'zksync-mainnet': 'https://mainnet.era.zksync.io',
    'zksync-sepolia': 'https://sepolia.era.zksync.dev',
    'immutable-zkevm-mainnet': 'https://rpc.immutable.com',
    'immutable-zkevm-testnet': 'https://rpc.testnet.immutable.com',
}

// Setup
const ARCHIVE_URL = lookupArchive(CHAIN)
const NODE_URL = nodes[CHAIN]


export const isProd = CHAIN.endsWith('mainnet')

console.log(`Using ${CHAIN} chain ${isProd ? 'production' : 'development'} environment`)

export const getArchiveUrl = (): string => ARCHIVE_URL
export const getNodeUrl = (): string => NODE_URL
