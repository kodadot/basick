import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { EvmBatchProcessor, BlockHandlerContext, LogHandlerContext } from "@subsquid/evm-processor";
import { In } from "typeorm";
import { BigNumberish as BigNumber } from "ethers";
import {
  CONTRACT_ADDRESS,
  getOrCreateContractEntity,
  MULTICALL_ADDRESS,
} from "./contract";
import { Owner, Token, Transfer } from "./model";
import { events } from "./abi/ERC721";
import { Multicall } from "./abi/multicall";
import { functions } from "./abi/ERC721";
import { maxBy } from 'lodash'
import { lookupArchive } from "@subsquid/archive-registry";

// export const CONTRACT_ADDRESS = '0x6e0bed56fb3eb7d2fecc5bb71f99e844cd3c2a0b'

const database = new TypeormDatabase();
const processor = new EvmBatchProcessor()
  .setBlockRange({ from: 5_188_611 })
  .setDataSource({
    chain: 'https://mainnet.era.zksync.io',
    archive: 'https://zksync.archive.subsquid.io',
  })
  .addLog(CONTRACT_ADDRESS, {
    filter: [[events.Transfer.topic]],
    data: {
      evmLog: {
        topics: true,
        data: true,
      },
      transaction: {
        hash: true,
      },
    },
  });

processor.run(database, async (ctx) => {
  const transfersData: TransferData[] = [];

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.kind === "evmLog") {
        if (item.address === CONTRACT_ADDRESS) {
          const transfer = handleTransfer({
            ...ctx,
            block: block.header,
            ...item,
          });

          transfersData.push(transfer);
        }
      }
    }
  }

  ctx.log.info(`Saving ${transfersData.length} transfers`)
  if(transfersData.length>0) {
    await saveTransfers({
      ...ctx,
      block: ctx.blocks[ctx.blocks.length - 1].header,
    }, transfersData);
  }
});

type TransferData = {
  id: string;
  from: string;
  to: string;
  tokenId: bigint;
  timestamp: bigint;
  block: number;
  transactionHash: string;
};

function handleTransfer(
  ctx: LogHandlerContext<
    Store,
    { evmLog: { topics: true; data: true }; transaction: { hash: true } }
  >
): TransferData {
  const { evmLog, transaction, block } = ctx;
  const addr = evmLog.address.toLowerCase()

  const { from, to, tokenId } = events.Transfer.decode(evmLog);

  const transfer: TransferData = {
    id: `${transaction.hash}-${addr}-${tokenId}-${evmLog.index}`,
    tokenId,
    from,
    to,
    timestamp: BigInt(block.timestamp),
    block: block.height,
    transactionHash: transaction.hash,
  };

  return transfer;
}

async function saveTransfers(ctx: BlockHandlerContext<Store>, transfersData: TransferData[]) {
  const tokensIds: Set<string> = new Set();
  const ownersIds: Set<string> = new Set();

  for (const transferData of transfersData) {
    tokensIds.add(transferData.tokenId.toString());
    ownersIds.add(transferData.from);
    ownersIds.add(transferData.to);
  }

  const transfers: Set<Transfer> = new Set();

  const tokens: Map<string, Token> = new Map(
    (await ctx.store.findBy(Token, { id: In([...tokensIds]) })).map((token) => [
      token.id,
      token,
    ])
  );

  const owners: Map<string, Owner> = new Map(
    (await ctx.store.findBy(Owner, { id: In([...ownersIds]) })).map((owner) => [
      owner.id,
      owner,
    ])
  );
  
  for (const transferData of transfersData) {

    let from = owners.get(transferData.from);
    if (from == null) {
      from = new Owner({ id: transferData.from, balance: 0n });
      owners.set(from.id, from);
    }

    let to = owners.get(transferData.to);
    if (to == null) {
      to = new Owner({ id: transferData.to, balance: 0n });
      owners.set(to.id, to);
    }

    const tokenIdString = transferData.tokenId.toString();

    let token = tokens.get(tokenIdString);

    if (token == null) {
      token = new Token({
        id: tokenIdString,
        //uri: to be set later 
        contract: await getOrCreateContractEntity(ctx.store),
      });
      tokens.set(token.id, token);
    }
    token.owner = to;

    const { id, block, transactionHash, timestamp } = transferData;

    const transfer = new Transfer({
      id,
      block,
      timestamp,
      transactionHash,
      from,
      to,
      token,
    });

    transfers.add(transfer);
  }

  

  const maxHeight = maxBy(transfersData, t => t.block)!.block; 
  // query the multicall contract at the max height of the chunk
  const multicall = new Multicall(ctx, {height: maxHeight}, MULTICALL_ADDRESS)

  ctx.log.info(`Calling mutlicall for ${transfersData.length} tokens...`)
  // call in pages of size 100
  const results = await multicall.tryAggregate(functions.tokenURI, transfersData.map(t => [CONTRACT_ADDRESS, [t.tokenId]] as [string, any[]]), 100);

  results.forEach((res, i) => {
    let t = tokens.get(transfersData[i].tokenId.toString());
    if (t) {
      let uri = '';
      if (res.success) {
        uri = <string>res.value;
      } else if (res.returnData) {
        uri = <string>functions.tokenURI.tryDecodeResult(res.returnData) || '';
      }
    }
  });
  ctx.log.info(`Done`);
  
  
  await ctx.store.save([...owners.values()]);
  await ctx.store.save([...tokens.values()]);
  await ctx.store.save([...transfers]);

}

