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

  let responseBody: any

  if (contentType?.includes('application/json')) {
    responseBody = await response.json()
  }

  if (!response.ok) {
    if (responseBody?.message) {
      throw new Error(responseBody.message)
    }

    throw new Error('Falha na requisição')
  }

  return responseBody
}

export { fetcher }
