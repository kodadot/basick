import { Store } from "@subsquid/typeorm-store";
import { Contract } from "./model";

// https://explorer.zksync.io/address/0xF9cda624FBC7e059355ce98a31693d299FACd963#contract
// https://www.multicall3.com/deployments

export const MULTICALL_ADDRESS='0xf9cda624fbc7e059355ce98a31693d299facd963'
export const CONTRACT_ADDRESS = '0x6e0bed56fb3eb7d2fecc5bb71f99e844cd3c2a0b'

let contractEntity: Contract | undefined;

export async function getOrCreateContractEntity(store: Store): Promise<Contract> {
  if (contractEntity == null) {
    contractEntity = await store.get(Contract, CONTRACT_ADDRESS);
    if (contractEntity == null) {
      contractEntity = new Contract({
        id: CONTRACT_ADDRESS,
        name: "Exosama",
        symbol: "EXO",
        totalSupply: 10000n,
      });
      await store.insert(contractEntity);
    }
  }
  return contractEntity;
}