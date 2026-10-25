import type { SiteSettings } from '../types'
import { esc, safeUrl } from '../utils'

export function header({ siteName, menu = [] }: SiteSettings): string {
  const menuHtml = menu
    .map((item) => `<a class="header__link" href="${esc(safeUrl(item.link))}">${esc(item.label)}</a>`)
    .join('')

  return `
    <header class="header">
      <a class="header__logo" href="/">${esc(siteName ?? 'Сайт')}</a>
      <button class="header__toggle" id="menu-toggle" aria-label="Меню" aria-expanded="false">[ МЕНЮ ]</button>
      <nav class="header__nav" id="menu">${menuHtml}</nav>
      <button class="header__theme" id="theme-toggle" aria-label="Змінити тему">[ ◐ ]</button>
    </header>
  `
}