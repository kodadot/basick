import { create } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { NFTEntity } from '../../model'
import { createEvent } from '../shared/event'
import { contractOf, unwrap } from '../utils/extract'
import { Action, BlockData, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { tokenName, tokenUri } from '../utils/evm'
import { getCreateTokenEvent } from './getters'

const OPERATION = Action.MINT

export function handleSingleTokenRegister(context: Log, _block: BlockData): ItemStateUpdate {
  const event = unwrap(context, getCreateTokenEvent)
  const contract = contractOf(event.collection)
  const tokenId = event.sn
  const to = event.owner
  const id = createTokenId(contract, tokenId)
  return {
    id,
    contract,
    state: {
      currentOwner: to,
      updatedAt: event.timestamp,
      createdAt: event.timestamp,
      blockNumber: BigInt(event.blockNumber),
      hash: md5(id),
      sn: tokenId,
      price: 0n,
      burned: false,
      lewd: false,
      version: 721,
      metadata: event.metadata,
    },
    interaction: OPERATION,
    event: createEvent(id, eventFrom(OPERATION, event, '', to)),
    applyTo(item): NFTEntity {
      const final = create(NFTEntity, id, { ...item, ...this.state })
      this.event.nft = final
      return final
    },
    applyFrom(collection) {
      this.state = {
        ...this.state,
        collection,
        issuer: collection.issuer,
        name: tokenName(collection.name, this.state.sn),
        metadata: this.state.metadata || tokenUri(collection.baseUri, this.state.sn)
      }

      return collection
    }
  }
}
