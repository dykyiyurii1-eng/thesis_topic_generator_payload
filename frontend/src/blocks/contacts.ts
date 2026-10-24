import './contacts.css'
import type { ContactsBlock } from '../types'

export function contacts({ anchor, title, phone, email, github, address }: ContactsBlock): string {
  const items: string[] = []

  if (phone) items.push(`<li><a href="tel:${phone.replace(/\s|\(|\)|-/g, '')}">${phone}</a></li>`)
  if (email) items.push(`<li><a href="mailto:${email}">${email}</a></li>`)
  if (github) items.push(`<li><a href="${github}" target="_blank" rel="noopener">GitHub</a></li>`)
  if (address) items.push(`<li>${address}</li>`)

  return `
    <section class="contacts" id="${anchor ?? 'contacts'}">
      <h2 class="contacts__title">${title}</h2>
      <ul class="contacts__list">${items.join('')}</ul>
    </section>
  `
}