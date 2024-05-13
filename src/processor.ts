import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { Store } from '@subsquid/typeorm-store'
import { events as erc721 } from './abi/ERC721'
import { events as registry } from './abi/Registry'
import { ENV_CONTRACTS, FINALITY_CONFIRMATION, STARTING_BLOCK, disabledRPC, getArchiveUrl, getNodeUrl } from './environment'

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
    .setFinalityConfirmation(FINALITY_CONFIRMATION)
    .setBlockRange({
        from: STARTING_BLOCK
        // from: 2_852_779
    })
    .setFields({
        log: {
            topics: true,
            data: true,
            // transactionHash: true
        }
    })
    .addLog({
        address: [ENV_CONTRACTS.REGISTRY],
        topic0: [registry.CollectionRegistered.topic],
        // transaction: true
    })
    .addLog({
        topic0: [erc721.Transfer.topic],
        // transaction: true
    })

    // contractList.forEach((contract) => {
    //     processor.addLog({
    //         address: [contract],
    //         topic0: [erc721.events.Transfer.topic],
    //         // transaction: true
    //     })
    // })

    // .addLog({
    //     address: [Contracts.Conjunto],
    //     topic0: [erc721.events.Transfer.topic],
    //     // transaction: true
    // })
    // .addLog({
    //     address: [Contracts.Bloquinhos],
    //     topic0: [erc721.events.Transfer.topic],
    //     // transaction: true
    // })
    // .addLog({
    //     address: [Contracts.Memories],
    //     topic0: [erc721.events.Transfer.topic],
    //     // transaction: true
    // })
    // .addLog({
    //     address: [Contracts.Vortices],
    //     topic0: [erc721.events.Transfer.topic],
    //     // transaction: true
    // })
    // .addLog({
    //     address: [Contracts.Higher],
    //     topic0: [erc721.events.Transfer.topic],
    //     // transaction: true
    // })


export type Fields = EvmBatchProcessorFields<typeof processor>
export type Process = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
