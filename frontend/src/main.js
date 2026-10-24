import './styles/base.css'
import { getSettings, getPage } from "./api.js"
import { renderBlocks } from './renderBlocks.js'
import { footer } from './layout/footer.js'
import { header } from './layout/header.js'
import './styles/theme.css'

async function start() {
  const app = document.querySelector("#app")
  try {
    const [setting, page] = await Promise.all([
      getSettings(),
      getPage(location.pathname)
    ])

    document.title = `${page.title} - ${setting.siteName}`

    app.innerHTML = `
      ${header(setting)}
      <main>
        ${renderBlocks(page.blocks)}
      </main>
      ${footer(setting)}
    `
  } catch (error) {
    app.textContent = `Error: ${error.message}`
  }
}

start()