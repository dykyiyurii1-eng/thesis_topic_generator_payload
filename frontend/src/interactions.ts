import { sendMessage } from './api'
import type { MessagePayload } from './types'
const THEME_KEY = 'theme'
const APP_URL: string = import.meta.env.VITE_APP_URL || ''

function applyTheme(inverted: boolean): void {
  document.documentElement.classList.toggle('invert', inverted)
}

export function restoreTheme(): void {
  try {
    applyTheme(localStorage.getItem(THEME_KEY) === 'invert')
  } catch {
   
  }
}

function initThemeToggle(): void {
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const next = !document.documentElement.classList.contains('invert')
    applyTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next ? 'invert' : 'normal')
    } catch {

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
  const sections = document.querySelectorAll<HTMLElement>('.hero, .features, .contacts, .feedback')
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
let formReady = false
function initFeedbackForm(): void {
  if (formReady) return
  formReady = true

  document.addEventListener('submit', async (event) => {
    const form = event.target as HTMLFormElement
    if (form.id !== 'feedback-form') return
    event.preventDefault()

    const status = form.querySelector<HTMLElement>('#feedback-status')!
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
    const data = new FormData(form)

    status.className = 'feedback__status'

    if (data.get('website')) {
      form.reset()
      status.textContent = '> ГОТОВО: повідомлення надіслано.'
      return
    }

    const payload: MessagePayload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    }

    button.disabled = true
    status.textContent = '> НАДСИЛАННЯ...'

    try {
      await sendMessage(payload)
      form.reset()
      status.textContent = '> ГОТОВО: повідомлення надіслано.'
    } catch (error) {
      console.error(error)
      status.classList.add('is-error')
      status.textContent = error instanceof TypeError
        ? '> ПОМИЛКА: немає зв’язку із сервером.'
        : '> ПОМИЛКА: не вдалося надіслати. Перевірте поля й спробуйте ще раз.'
    } finally {
      button.disabled = false
    }
  })
}
export function initInteractions(): void {
  initThemeToggle()
  initMenu()
  initReveal()
  initAppLinks()
  initFeedbackForm()
}