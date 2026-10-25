export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
export function safeUrl(value: unknown): string {
  const url = String(value ?? '').trim()
  return /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : '#'
}