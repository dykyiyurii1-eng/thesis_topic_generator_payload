import './contacts.css'
import type { ContactsBlock } from '../types'
import { esc, safeUrl } from '../utils'

export function contacts({ anchor, title, phone, email, github, address }: ContactsBlock): string {
  const items: string[] = []

  if (phone) {
    const tel = phone.replace(/[^\d+]/g, '')
    items.push(`<li><a href="tel:${esc(tel)}">${esc(phone)}</a></li>`)
  }
  if (email) items.push(`<li><a href="mailto:${esc(email)}">${esc(email)}</a></li>`)
  if (github) {
    items.push(`<li><a href="${esc(safeUrl(github))}" target="_blank" rel="noopener noreferrer">GitHub</a></li>`)
  }
  if (address) items.push(`<li>${esc(address)}</li>`)

  return `
    <section class="contacts" id="${esc(anchor ?? 'contacts')}">
      <h2 class="contacts__title">${esc(title)}</h2>
      <ul class="contacts__list">${items.join('')}</ul>
    </section>
  `
}