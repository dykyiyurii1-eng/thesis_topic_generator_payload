import type { SiteSettings } from '../types'
import { esc } from '../utils'

export function footer({ siteName, footer }: SiteSettings): string {
  const year = new Date().getFullYear()

  return `
    <footer class="footer">
      © ${year} ${esc(siteName ?? 'Сайт')}. ${esc(footer)}
    </footer>
  `
}