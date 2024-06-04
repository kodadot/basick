import { create } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { NFTEntity } from '../../model'
import { createEvent } from '../shared/event'
import { contractOf, toBaseEvent } from '../utils/extract'
import { Action, ItemStateUpdate, Log, createTokenId, eventFrom } from '../utils/types'
import { Transfer } from './utils'
import { tokenName, tokenUri } from '../utils/evm'

const OPERATION = Action.MINT

export function handleTokenCreate({ to, tokenId }: Transfer, context: Log): ItemStateUpdate {
  const contract = contractOf(context)
  const base = toBaseEvent(context)
  const id = createTokenId(contract, tokenId)
  return {
    id,
    contract,
    state: {
      currentOwner: to,
      updatedAt: base.timestamp,
      createdAt: base.timestamp,
      blockNumber: BigInt(base.blockNumber),
      hash: md5(id),
      sn: tokenId.toString(),
      price: 0n,
      burned: false,
      lewd: false,
      version: 721
    },
    interaction: OPERATION,
    event: createEvent(id, eventFrom(OPERATION, base, '', to)),
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
        metadata: tokenUri(collection.baseUri, this.state.sn)
      }

      return collection
    }
  }
}
