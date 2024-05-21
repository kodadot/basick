import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './Registry.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    AttributeSet: new LogEvent<([collection: string, key: string, value: string] & {collection: string, key: string, value: string})>(
        abi, '0x303cb4bccd82d4cb890c21ce6b8b0e146eeb06897cd8606c4174315d650b1964'
    ),
    CollectionRegistered: new LogEvent<([collection: string, creator: string, owner: string, info: ([name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})] & {name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})})] & {collection: string, creator: string, owner: string, info: ([name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})] & {name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})})})>(
        abi, '0xe61c246de918b0321963799570b65ee0269eedf23a4c46fa72f0f753d719d4e1'
    ),
    CollectionRemoved: new LogEvent<([collection: string] & {collection: string})>(
        abi, '0xa0691bd707b2f65c33c8343d61c274df72c6b5007937dcfbc31aa5a0d0f6fe3c'
    ),
    MintInfoUpdated: new LogEvent<([collection: string, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})] & {collection: string, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})})>(
        abi, '0xe969c4243a2b4f2fdd0875a670d7d8275a68c59daea2104b5c349704a10e7bd7'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Paused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'
    ),
    RoyaltySet: new LogEvent<([collection: string, recipient: string, royaltyBps: bigint] & {collection: string, recipient: string, royaltyBps: bigint})>(
        abi, '0x6f5b4e162a5bcb4c9002a853f3f0f850f68a3ea9de4507cc670f4f43654abe4a'
    ),
    TokenListRegistered: new LogEvent<([collection: string, tokenIds: Array<bigint>, owners: Array<string>, tokenURIs: Array<string>] & {collection: string, tokenIds: Array<bigint>, owners: Array<string>, tokenURIs: Array<string>})>(
        abi, '0x31d5712eb101c22524b47b50448cdb141806ab4faff233f5cf719bafc4407fd3'
    ),
    TokenRegistered: new LogEvent<([collection: string, tokenId: bigint, owner: string, tokenURI: string] & {collection: string, tokenId: bigint, owner: string, tokenURI: string})>(
        abi, '0x4f69e3ef7b5e7e3871a2e6852168adefaaf31b41d54adbe97f37416e4b3c9bc9'
    ),
    Unpaused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
}

export const functions = {
    collectionRegistry: new Func<[collection: string], {collection: string}, ([name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})] & {name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})})>(
        abi, '0x68e9dc9c'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    paused: new Func<[], {}, boolean>(
        abi, '0x5c975abb'
    ),
    registerCollection: new Func<[collection: string, creator: string, maxSupply: bigint, contractUri: string, baseUri: string, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})], {collection: string, creator: string, maxSupply: bigint, contractUri: string, baseUri: string, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})}, []>(
        abi, '0x6da48257'
    ),
    registerMultipleTokens: new Func<[collection: string, tokenIds: Array<bigint>], {collection: string, tokenIds: Array<bigint>}, []>(
        abi, '0x5dacfd3d'
    ),
    registerRoyalty: new Func<[collection: string], {collection: string}, []>(
        abi, '0xc774b5e2'
    ),
    registerSingleToken: new Func<[collection: string, tokenId: bigint], {collection: string, tokenId: bigint}, []>(
        abi, '0xd3719ae6'
    ),
    removeCollection: new Func<[collection: string], {collection: string}, []>(
        abi, '0x5028d05a'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setAttribute: new Func<[collection: string, key: string, value: string], {collection: string, key: string, value: string}, []>(
        abi, '0x758cc6b4'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    updateMintInfo: new Func<[collection: string, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})], {collection: string, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})}, []>(
        abi, '0xbfac79e3'
    ),
}

export class Contract extends ContractBase {

    collectionRegistry(collection: string): Promise<([name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})] & {name: string, symbol: string, contractURI: string, baseURI: string, maxSupply: bigint, royaltyRecipient: string, royaltyPercentageBps: bigint, collectionType: number, mintInfo: ([price: bigint, token: string, selector: string, mintType: number] & {price: bigint, token: string, selector: string, mintType: number})})> {
        return this.eth_call(functions.collectionRegistry, [collection])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }
}
