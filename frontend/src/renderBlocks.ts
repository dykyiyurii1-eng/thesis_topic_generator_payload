import { hero } from './blocks/hero'
import { features } from './blocks/features'
import { contacts } from './blocks/contacts'
import type { Block, BlockType } from './types'

type Renderers = {
  [K in BlockType]: (block: Extract<Block, { type: K }>) => string
}

const renderers: Renderers = { hero, features, contacts }

export function renderBlocks(blocks: Block[]): string {
  return blocks
    .map((block) => {
      const render = renderers[block.type] as (b: Block) => string
      if (!render) {
        console.warn(`Немає рендерера для типу: ${block.type}`)
        return ''
      }
      return render(block)
    })
    .join('')
}