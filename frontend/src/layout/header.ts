import type { SiteSettings } from '../types'

export function header({ siteName, menu = [] }: SiteSettings): string {
  const menuHtml = menu
    .map((item) => `<a class="header__link" href="${item.link}">${item.label}</a>`)
    .join('')

  return `
    <header class="header">
      <a class="header__logo" href="/">${siteName ?? 'Сайт'}</a>
      <nav class="header__nav">${menuHtml}</nav>
    </header>
  `
}