import { getStoredToken } from '$/lib/storage'

async function fetcher<T>(path: string, method: string = 'GET', data?: unknown): Promise<T> {
  const token = getStoredToken()
  let body

  if (data) {
    body = JSON.stringify(data)
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body
  })

  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    const responseBody = await response.json()

    return responseBody
  }

  return undefined as T
}

export { fetcher }
