import { events } from '../../../abi/Registry'
import { CollectionRegisteredEvent, Log, MintInfoUpdatedEvent, TokenRegisteredEvent } from '../../utils/types'

export function getCreateCollectionEvent(ctx: Log): CollectionRegisteredEvent {
  const event = events.CollectionRegistered

  const x = event.decode(ctx)
  return {
    // id: x.collection  ,
    collection: x.collection,
    creator: x.creator,
    owner: x.owner,
    info: {
      name: x.info.name,
      symbol: x.info.symbol,
      contractURI: x.info.contractURI,
      baseURI: x.info.baseURI,
      maxSupply: x.info.maxSupply,
      royaltyRecipient: x.info.royaltyRecipient,
      royaltyPercentageBps: x.info.royaltyPercentageBps,
      collectionType: x.info.collectionType,
      mintInfo: {
        price: x.info.mintInfo.price,
        token: x.info.mintInfo.token,
        selector: x.info.mintInfo.selector,
        mintType: x.info.mintInfo.mintType
      }
    }
  }
}


export function getCreateTokenEvent(ctx: Log): TokenRegisteredEvent {
  const event = events.TokenRegistered

  const x = event.decode(ctx)
  return {
    collection: x.collection.toString(),
    sn: x.tokenId,
    owner: x.owner,
    metadata: x.tokenURI
  }
}

export function getCreateTokenListEvent(ctx: Log): TokenRegisteredEvent[] {
  const event = events.TokenListRegistered 

  const list = event.decode(ctx)

  return list.tokenIds.map((x, index) => ({
    collection: list.collection.toString(),
    sn: x,
    owner: list.owners[index],
    metadata: list.tokenURIs[index]
  }))
}

export function getMintInfoUpdatedEvent(ctx: Log): MintInfoUpdatedEvent {
  const event = events.MintInfoUpdated

  const x = event.decode(ctx)
  return {
    collection: x.collection,
    mintInfo: {
      price: x.mintInfo.price,
      token: x.mintInfo.token,
      selector: x.mintInfo.selector,
      mintType: x.mintInfo.mintType
    }
  }
}

