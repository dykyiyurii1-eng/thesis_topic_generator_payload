import type { PageResponse, SiteSettings, MessagePayload } from './types'

const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) {
    throw new ApiError(`HTTP status ${res.status}`, res.status)
  }
  return res.json() as Promise<T>
}

export function getSettings(): Promise<SiteSettings> {
  return getJson<SiteSettings>('/api/common')
}

export function getPage(path: string): Promise<PageResponse> {
  return getJson<PageResponse>(`/api/page?path=${encodeURIComponent(path)}`)
}
export async function sendMessage(data: MessagePayload): Promise<void> {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new ApiError(`HTTP status ${res.status}`, res.status)
  }
}