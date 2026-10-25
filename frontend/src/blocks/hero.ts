import './hero.css'
import type { HeroBlock } from '../types'
import { esc, safeUrl } from '../utils'

export function hero({ anchor, badge, title, subtitle, image, buttons = [] }: HeroBlock): string {
  return `
    <section class="hero" id="${esc(anchor ?? 'home')}">
      <div class="hero__content">
        ${badge ? `<span class="hero__badge">${esc(badge)}</span>` : ''}
        <h1 class="hero__title">${esc(title)}</h1>
        <p class="hero__subtitle">${esc(subtitle)}.</p>
        <div class="hero__actions">
          ${buttons.map(({ text, link, variant }) => `
            <a class="btn btn--${esc(variant)}" href="${esc(safeUrl(link))}">${esc(text)}</a>
          `).join('')}
        </div>
      </div>
      ${image ? `<img class="hero__image" src="${esc(image.src)}" alt="${esc(image.alt)}">` : ''}
    </section>
  `
}