import './styles/base.css'
import { getSettings, getPage, ApiError } from './api'
import { renderBlocks } from './renderBlocks'
import { footer } from './layout/footer'
import { header } from './layout/header'
import { restoreTheme, initInteractions } from './interactions'
import './styles/theme.css'

const app = document.querySelector<HTMLDivElement>('#app')!

restoreTheme()

function renderLoading(): void {
  app.innerHTML = `<div class="state" role="status">&gt; ЗАВАНТАЖЕННЯ...</div>`
}

function errorMessage(error: unknown): string {
  if (error instanceof ApiError && error.status === 404) {
    return 'Сторінку не знайдено.'
  }
  if (error instanceof TypeError) {
    return 'Не вдалося з’єднатися із сервером. Перевірте, чи працює CMS.'
  }
  return 'Щось пішло не так. Спробуйте ще раз.'
}

function renderError(error: unknown): void {
  app.innerHTML = `
    <div class="state state--error" role="alert">
      <p>&gt; ПОМИЛКА: ${errorMessage(error)}</p>
      <button class="btn btn--primary" id="retry">Спробувати ще раз</button>
    </div>
  `
  document.querySelector('#retry')?.addEventListener('click', start)
}

async function start(): Promise<void> {
  renderLoading()
  try {
    const [setting, page] = await Promise.all([
      getSettings(),
      getPage(location.pathname),
    ])

    document.title = `${page.title} - ${setting.siteName}`

    app.innerHTML = `
      ${header(setting)}
      <main>${renderBlocks(page.blocks)}</main>
      ${footer(setting)}
    `

    initInteractions()
  } catch (error) {
    console.error(error)
    renderError(error)
  }
}

start()