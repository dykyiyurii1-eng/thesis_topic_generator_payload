import './feedback.css'
import type { FeedbackBlock } from '../types'
import { esc } from '../utils'

export function feedback({ anchor, title, description, submitLabel }: FeedbackBlock): string {
  return `
    <section class="feedback" id="${esc(anchor ?? 'feedback')}">
      <h2 class="feedback__title">${esc(title)}</h2>
      ${description ? `<p class="feedback__text">${esc(description)}</p>` : ''}
      <form class="feedback__form" id="feedback-form">
        <label class="feedback__field">Ім’я
          <input name="name" type="text" required maxlength="100" autocomplete="name">
        </label>
        <label class="feedback__field">Email
          <input name="email" type="email" required autocomplete="email">
        </label>
        <label class="feedback__field">Повідомлення
          <textarea name="message" rows="5" required minlength="10" maxlength="2000"></textarea>
        </label>
        <input class="feedback__trap" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn--primary" type="submit">${esc(submitLabel ?? 'Надіслати')}</button>
        <p class="feedback__status" id="feedback-status" role="status" aria-live="polite"></p>
      </form>
    </section>
  `
}