import './contacts.css'
export function contacts({ anchor, title, phone, email, address }) {
  return `
    <section class="contacts" id="${anchor}">
      <h2 class="contacts__title">${title}</h2>
      <ul class="contacts__list">
        <li><a href="tel:${phone.replace(/\s|\(|\)|-/g, '')}">${phone}</a></li>
        <li><a href="mailto:${email}">${email}</a></li>
        <li>${address}</li>
      </ul>
    </section>
  `
}