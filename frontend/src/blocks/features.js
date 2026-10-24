import './features.css'
export function features({ anchor, title, items }) {
  return `
    <section class="features" id="${anchor}">
      <h2 class="features__title">${title}</h2>
      <div class="features__grid">
        ${items.map(({ icon, title, text }) => `
          <div class="features__item">
            <div class="features__icon">${icon}</div>
            <h3 class="features__item-title">${title}</h3>
            <p class="features__item-text">${text}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `
}