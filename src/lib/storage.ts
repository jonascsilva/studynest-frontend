import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'auth.token'

function getStoredToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) return null

  try {
    const decoded = jwtDecode<{ exp?: number }>(token)
    const currentTime = Date.now() / 1000
    const expiration = decoded.exp

    if (!expiration) return null

    if (expiration < currentTime) return null

    return token
  } catch (e) {
    console.error(e)

    return null
  }
}

function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export { getStoredToken, setStoredToken }
