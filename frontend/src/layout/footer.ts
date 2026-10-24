import type { SiteSettings } from '../types'

export function footer({ siteName, footer }: SiteSettings): string {
  const year = new Date().getFullYear()

  return `
    <footer class="footer">
      © ${year} ${siteName ?? 'Сайт'}. ${footer ?? ''}
    </footer>
  `
}