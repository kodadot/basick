import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ImmutableERC721.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: bigint] & {owner: string, approved: string, tokenId: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    EIP712DomainChanged: new LogEvent<[]>(
        abi, '0x0a6387c9ea3628b88a633bb4f3b151770f70085117a15f9bf3787cda53f13d31'
    ),
    OperatorAllowlistRegistryUpdated: new LogEvent<([oldRegistry: string, newRegistry: string] & {oldRegistry: string, newRegistry: string})>(
        abi, '0x3edc37a14cc8047c7c8a3f354311efe86c14848efd4e3765a3e1e57eea04ea76'
    ),
    RoleAdminChanged: new LogEvent<([role: string, previousAdminRole: string, newAdminRole: string] & {role: string, previousAdminRole: string, newAdminRole: string})>(
        abi, '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff'
    ),
    RoleGranted: new LogEvent<([role: string, account: string, sender: string] & {role: string, account: string, sender: string})>(
        abi, '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d'
    ),
    RoleRevoked: new LogEvent<([role: string, account: string, sender: string] & {role: string, account: string, sender: string})>(
        abi, '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: bigint] & {from: string, to: string, tokenId: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: new Func<[], {}, string>(
        abi, '0xa217fddf'
    ),
    DOMAIN_SEPARATOR: new Func<[], {}, string>(
        abi, '0x3644e515'
    ),
    MINTER_ROLE: new Func<[], {}, string>(
        abi, '0xd5391393'
    ),
    approve: new Func<[to: string, tokenId: bigint], {to: string, tokenId: bigint}, []>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, bigint>(
        abi, '0x70a08231'
    ),
    baseURI: new Func<[], {}, string>(
        abi, '0x6c0360eb'
    ),
    burn: new Func<[tokenId: bigint], {tokenId: bigint}, []>(
        abi, '0x42966c68'
    ),
    burnBatch: new Func<[tokenIDs: Array<bigint>], {tokenIDs: Array<bigint>}, []>(
        abi, '0xe4623c1b'
    ),
    contractURI: new Func<[], {}, string>(
        abi, '0xe8a3d485'
    ),
    eip712Domain: new Func<[], {}, ([fields: string, name: string, version: string, chainId: bigint, verifyingContract: string, salt: string, extensions: Array<bigint>] & {fields: string, name: string, version: string, chainId: bigint, verifyingContract: string, salt: string, extensions: Array<bigint>})>(
        abi, '0x84b0196e'
    ),
    exists: new Func<[tokenId: bigint], {tokenId: bigint}, boolean>(
        abi, '0x4f558e79'
    ),
    getAdmins: new Func<[], {}, Array<string>>(
        abi, '0x31ae450b'
    ),
    getApproved: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x081812fc'
    ),
    getRoleAdmin: new Func<[role: string], {role: string}, string>(
        abi, '0x248a9ca3'
    ),
    getRoleMember: new Func<[role: string, index: bigint], {role: string, index: bigint}, string>(
        abi, '0x9010d07c'
    ),
    getRoleMemberCount: new Func<[role: string], {role: string}, bigint>(
        abi, '0xca15c873'
    ),
    grantMinterRole: new Func<[user: string], {user: string}, []>(
        abi, '0x3dd1eb61'
    ),
    grantRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0x2f2ff15d'
    ),
    hasRole: new Func<[role: string, account: string], {role: string, account: string}, boolean>(
        abi, '0x91d14854'
    ),
    isApprovedForAll: new Func<[owner: string, operator: string], {owner: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    mint: new Func<[to: string, tokenId: bigint], {to: string, tokenId: bigint}, []>(
        abi, '0x40c10f19'
    ),
    mintBatch: new Func<[mints: Array<([to: string, tokenIds: Array<bigint>] & {to: string, tokenIds: Array<bigint>})>], {mints: Array<([to: string, tokenIds: Array<bigint>] & {to: string, tokenIds: Array<bigint>})>}, []>(
        abi, '0x9e2641a3'
    ),
    mintBatchByQuantity: new Func<[mints: Array<([to: string, quantity: bigint] & {to: string, quantity: bigint})>], {mints: Array<([to: string, quantity: bigint] & {to: string, quantity: bigint})>}, []>(
        abi, '0xe1927859'
    ),
    mintBatchByQuantityThreshold: new Func<[], {}, bigint>(
        abi, '0x315ed308'
    ),
    mintByQuantity: new Func<[to: string, quantity: bigint], {to: string, quantity: bigint}, []>(
        abi, '0xeea98768'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[tokenId: bigint], {tokenId: bigint}, bigint>(
        abi, '0x141a468c'
    ),
    operatorAllowlist: new Func<[], {}, string>(
        abi, '0x29326f29'
    ),
    ownerOf: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x6352211e'
    ),
    permit: new Func<[spender: string, tokenId: bigint, deadline: bigint, sig: string], {spender: string, tokenId: bigint, deadline: bigint, sig: string}, []>(
        abi, '0x745a41bc'
    ),
    renounceRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0x36568abe'
    ),
    revokeMinterRole: new Func<[user: string], {user: string}, []>(
        abi, '0x69e2f0fb'
    ),
    revokeRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0xd547741f'
    ),
    royaltyInfo: new Func<[tokenId: bigint, salePrice: bigint], {tokenId: bigint, salePrice: bigint}, [_: string, _: bigint]>(
        abi, '0x2a55205a'
    ),
    safeBurn: new Func<[owner: string, tokenId: bigint], {owner: string, tokenId: bigint}, []>(
        abi, '0x9f15d700'
    ),
    safeBurnBatch: new Func<[burns: Array<([owner: string, tokenIds: Array<bigint>] & {owner: string, tokenIds: Array<bigint>})>], {burns: Array<([owner: string, tokenIds: Array<bigint>] & {owner: string, tokenIds: Array<bigint>})>}, []>(
        abi, '0x74f16a81'
    ),
    safeMint: new Func<[to: string, tokenId: bigint], {to: string, tokenId: bigint}, []>(
        abi, '0xa1448194'
    ),
    safeMintBatch: new Func<[mints: Array<([to: string, tokenIds: Array<bigint>] & {to: string, tokenIds: Array<bigint>})>], {mints: Array<([to: string, tokenIds: Array<bigint>] & {to: string, tokenIds: Array<bigint>})>}, []>(
        abi, '0x234af046'
    ),
    safeMintBatchByQuantity: new Func<[mints: Array<([to: string, quantity: bigint] & {to: string, quantity: bigint})>], {mints: Array<([to: string, quantity: bigint] & {to: string, quantity: bigint})>}, []>(
        abi, '0x2d2c5a8b'
    ),
    safeMintByQuantity: new Func<[to: string, quantity: bigint], {to: string, quantity: bigint}, []>(
        abi, '0x567e4075'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: bigint], {from: string, to: string, tokenId: bigint}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[from: string, to: string, tokenId: bigint, _data: string], {from: string, to: string, tokenId: bigint, _data: string}, []>(
        abi, '0xb88d4fde'
    ),
    safeTransferFromBatch: new Func<[tr: ([from: string, tos: Array<string>, tokenIds: Array<bigint>] & {from: string, tos: Array<string>, tokenIds: Array<bigint>})], {tr: ([from: string, tos: Array<string>, tokenIds: Array<bigint>] & {from: string, tos: Array<string>, tokenIds: Array<bigint>})}, []>(
        abi, '0x008ad946'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setBaseURI: new Func<[baseURI_: string], {baseURI_: string}, []>(
        abi, '0x55f804b3'
    ),
    setContractURI: new Func<[_contractURI: string], {_contractURI: string}, []>(
        abi, '0x938e3d7b'
    ),
    setDefaultRoyaltyReceiver: new Func<[receiver: string, feeNumerator: bigint], {receiver: string, feeNumerator: bigint}, []>(
        abi, '0x885e7a08'
    ),
    setNFTRoyaltyReceiver: new Func<[tokenId: bigint, receiver: string, feeNumerator: bigint], {tokenId: bigint, receiver: string, feeNumerator: bigint}, []>(
        abi, '0x439aed34'
    ),
    setNFTRoyaltyReceiverBatch: new Func<[tokenIds: Array<bigint>, receiver: string, feeNumerator: bigint], {tokenIds: Array<bigint>, receiver: string, feeNumerator: bigint}, []>(
        abi, '0xa7012816'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    tokenURI: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0xc87b56dd'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transferFrom: new Func<[from: string, to: string, tokenId: bigint], {from: string, to: string, tokenId: bigint}, []>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE(): Promise<string> {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, [])
    }

    DOMAIN_SEPARATOR(): Promise<string> {
        return this.eth_call(functions.DOMAIN_SEPARATOR, [])
    }

    MINTER_ROLE(): Promise<string> {
        return this.eth_call(functions.MINTER_ROLE, [])
    }

    balanceOf(owner: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    baseURI(): Promise<string> {
        return this.eth_call(functions.baseURI, [])
    }

    contractURI(): Promise<string> {
        return this.eth_call(functions.contractURI, [])
    }

    eip712Domain(): Promise<([fields: string, name: string, version: string, chainId: bigint, verifyingContract: string, salt: string, extensions: Array<bigint>] & {fields: string, name: string, version: string, chainId: bigint, verifyingContract: string, salt: string, extensions: Array<bigint>})> {
        return this.eth_call(functions.eip712Domain, [])
    }

    exists(tokenId: bigint): Promise<boolean> {
        return this.eth_call(functions.exists, [tokenId])
    }

    getAdmins(): Promise<Array<string>> {
        return this.eth_call(functions.getAdmins, [])
    }

    getApproved(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.getApproved, [tokenId])
    }

    getRoleAdmin(role: string): Promise<string> {
        return this.eth_call(functions.getRoleAdmin, [role])
    }

    getRoleMember(role: string, index: bigint): Promise<string> {
        return this.eth_call(functions.getRoleMember, [role, index])
    }

    getRoleMemberCount(role: string): Promise<bigint> {
        return this.eth_call(functions.getRoleMemberCount, [role])
    }

    hasRole(role: string, account: string): Promise<boolean> {
        return this.eth_call(functions.hasRole, [role, account])
    }

    isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [owner, operator])
    }

    mintBatchByQuantityThreshold(): Promise<bigint> {
        return this.eth_call(functions.mintBatchByQuantityThreshold, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.nonces, [tokenId])
    }

    operatorAllowlist(): Promise<string> {
        return this.eth_call(functions.operatorAllowlist, [])
    }

    ownerOf(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.ownerOf, [tokenId])
    }

    royaltyInfo(tokenId: bigint, salePrice: bigint): Promise<[_: string, _: bigint]> {
        return this.eth_call(functions.royaltyInfo, [tokenId, salePrice])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    tokenURI(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.tokenURI, [tokenId])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }
}
