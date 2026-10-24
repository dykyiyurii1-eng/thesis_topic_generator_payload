const THEME_KEY = 'theme'
const APP_URL: string = import.meta.env.VITE_APP_URL || ''

function applyTheme(inverted: boolean): void {
  document.documentElement.classList.toggle('invert', inverted)
}

export function restoreTheme(): void {
  try {
    applyTheme(localStorage.getItem(THEME_KEY) === 'invert')
  } catch {
    /* localStorage може бути недоступний */
  }
}

function initThemeToggle(): void {
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const next = !document.documentElement.classList.contains('invert')
    applyTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next ? 'invert' : 'normal')
    } catch {
      /* ігноруємо */
    }
  })
}

function initMenu(): void {
  const button = document.querySelector<HTMLButtonElement>('#menu-toggle')
  const nav = document.querySelector<HTMLElement>('#menu')
  if (!button || !nav) return

  const setOpen = (open: boolean): void => {
    nav.classList.toggle('is-open', open)
    button.setAttribute('aria-expanded', String(open))
  }

  button.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')))
  nav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false)
  })
}

function initReveal(): void {
  const sections = document.querySelectorAll<HTMLElement>('.hero, .features, .contacts')
  if (!('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  sections.forEach((section) => {
    section.classList.add('reveal')
    observer.observe(section)
  })
}

let appLinksReady = false
function initAppLinks(): void {
  if (!APP_URL || appLinksReady) return
  appLinksReady = true

  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a')
    if (!link || !link.href.startsWith(APP_URL)) return

    const url = new URL(link.href)
    const inverted = document.documentElement.classList.contains('invert')
    url.searchParams.set('theme', inverted ? 'invert' : 'normal')
    link.href = url.toString()
  })
}

export function initInteractions(): void {
  initThemeToggle()
  initMenu()
  initReveal()
  initAppLinks()
}