const TOKEN_KEY = 'auth.token'

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export { getStoredToken, setStoredToken }
