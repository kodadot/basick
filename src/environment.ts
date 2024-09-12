export type Chain = 'zksync' | 'immutable-zkevm' | 'base' | 'mantle'
export type ChainEnv = 'mainnet'
// | 'testnet' 
type ChainWithEnv = `${Chain}-${ChainEnv}`
type PossibleChain = ChainWithEnv | `${Chain}-${string}`

export const CHAIN: PossibleChain = process.env.CHAIN as ChainWithEnv || 'base-mainnet'

export const STARTING_BLOCK = Number(process.env.STARTING_BLOCK || 0)
export const FINALITY_CONFIRMATION = Number(process.env.FINALITY_CONFIRMATION || 75)
export const PREINDEX_BLOCK = Number(process.env.PREINDEX_BLOCK || 0)

export const ENV_CONTRACTS = {
    REGISTRY: process.env.CONTRACT_REGISTRY || '0x672c524543454a5ffb0840131158a26296b0426c'
}

// https://github.com/zkSync-Community-Hub/zksync-developers/discussions/228
// https://docs.immutable.com/docs/zkevm/architecture/network-information/
// https://docs.base.org/network-information/
const nodes: Record<PossibleChain, string> = {
    'zksync-mainnet': 'https://mainnet.era.zksync.io',
    'zksync-sepolia': 'https://sepolia.era.zksync.dev',
    'immutable-zkevm-mainnet': 'https://rpc.immutable.com',
    'immutable-zkevm-testnet': 'https://rpc.testnet.immutable.com',
    'base-mainnet': 'https://mainnet.base.org',
    'base-sepolia': 'https://sepolia.base.org',
    'mantle-mainnet': 'https://rpc.mantle.xyz',
}

// Setup
const ARCHIVE_URL = `https://v2.archive.subsquid.io/network/${CHAIN}`
const NODE_URL = nodes[CHAIN]


export const isProd = CHAIN.endsWith('mainnet')
export const disabledRPC = process.env.DISABLED_RPC === 'true' ?? !isProd

console.table({
    CHAIN,
    ARCHIVE_URL,
    NODE_URL,
    STARTING_BLOCK,
    PREINDEX_BLOCK,
    REGISTRY: ENV_CONTRACTS.REGISTRY,
    disabledRPC,
    environment: isProd ? 'production' : 'development',
})

export const getArchiveUrl = (): string => ARCHIVE_URL
export const getNodeUrl = (): string => NODE_URL
