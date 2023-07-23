import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc721 from './abi/ERC721'

export const CONTRACT_ADDRESS = '0x6e0bed56fb3eb7d2fecc5bb71f99e844cd3c2a0b'

const archive = lookupArchive('zksync', { release: 'FireSquid' })


export const processor = new EvmBatchProcessor()
    .setDataSource({
        // archive,
        chain: 'https://mainnet.era.zksync.io'
    })
    .setFinalityConfirmation(75)
    .setBlockRange({
        from: 5_188_611,
        to: 5_188_711
    })
    .addLog({
        address: [CONTRACT_ADDRESS],
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
