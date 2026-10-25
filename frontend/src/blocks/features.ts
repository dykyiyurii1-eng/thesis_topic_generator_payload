import './features.css'
import type { FeaturesBlock } from '../types'
import { esc } from '../utils'

export function features({ anchor, title, items = [] }: FeaturesBlock): string {
  return `
    <section class="features" id="${esc(anchor ?? 'features')}">
      <h2 class="features__title">${esc(title)}</h2>
      <div class="features__grid">
        ${items.map((item) => `
          <div class="features__item">
            <div class="features__icon">${esc(item.icon)}</div>
            <h3 class="features__item-title">${esc(item.title)}</h3>
            <p class="features__item-text">${esc(item.text)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `
}