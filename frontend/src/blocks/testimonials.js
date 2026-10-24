export function testimonials({ anchor, title, items }) {
  return `
    <section class="testimonials" id="${anchor}">
      <h2 class="testimonials__title">${title}</h2>
      <div class="testimonials__grid">
        ${items.map(({ name, text, rating }) => `
          <div class="testimonials__item">
            <div class="testimonials__stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
            <p class="testimonials__text">${text}</p>
            <div class="testimonials__name">${name}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `
}