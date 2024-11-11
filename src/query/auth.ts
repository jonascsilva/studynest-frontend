import { userCredentials } from '$/types'

async function signin(data: userCredentials) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return response.json()
}

export { signin }
