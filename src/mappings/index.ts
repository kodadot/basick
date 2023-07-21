import { serializer } from '@kodadot1/metasquid'
import * as erc721 from '../abi/ERC721'
import { handler as handle721Token } from './erc721'
import { ERC721_TRANSFER } from './erc721/utils'
import { BlockData, Context, ItemStateUpdate, Log } from './utils/types'
import { CONTRACT_ADDRESS } from '../processor'

export async function mainFrame(ctx: Context): Promise<void> {
  const items = []

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      const item = unwrapLog(log, block)
      if (item) {
        items.push(item)
      }
    }
  }

  if (items.length === 0) {
    return
  }

  const { contracts, tokens } = uniqueEntities(items)

  console.log(JSON.stringify(items, serializer, 2))
}

function unwrapLog(log: Log, block: BlockData) {
  switch (log.topics[0]) {
    case ERC721_TRANSFER:
      
      if (log.address !== CONTRACT_ADDRESS) {
        return null
      }
      console.log('erc721 transfer', log.topics, log.address === CONTRACT_ADDRESS)
      return handle721Token(log, block)
    default:
      // console.log('unknown log', log.topics[0])
      return null
    // throw new Error('unknown log')
  }
}

function uniqueEntities<T extends ItemStateUpdate>(items: T[]): { contracts: Set<string>, tokens: Set<string> } {
  const contracts = new Set<string>(items.map((i) => i.contract))
  const tokens = new Set<string>(items.map((i) => i.id))

  return {
    contracts,
    tokens,
  }
}
