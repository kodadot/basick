import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { Store } from '@subsquid/typeorm-store'
import * as erc721 from './abi/ERC721'
import { disabledRPC, getArchiveUrl, getNodeUrl } from './environment'
import { Contracts } from './processable'

// export const CONTRACT_ADDRESS = '0x6e0bed56fb3eb7d2fecc5bb71f99e844cd3c2a0b'

const archive = getArchiveUrl() // lookupArchive('zksync-mainnet')
const chain = getNodeUrl() // 'https://mainnet.era.zksync.io'


export const processor = new EvmBatchProcessor()
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    .setGateway(archive)
    // Chain RPC endpoint is required for
    //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
    //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
    .setRpcEndpoint({
        // Set the URL via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: chain,
        // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
        rateLimit: 15
    })
    .setRpcDataIngestionSettings({ disabled: disabledRPC })
    .setFinalityConfirmation(75)
    .setBlockRange({
        from: 0
        // from: 2_852_779
    })
    .addLog({
        address: [Contracts.LizardLabs],
        topic0: [erc721.events.Transfer.topic],
        // transaction: true
    })
    .addLog({
        address: [Contracts.SuperPets],
        topic0: [erc721.events.Transfer.topic],
        // transaction: true
    })
    .setFields({
        log: {
            topics: true,
            data: true,
            // transactionHash: true
        }
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
