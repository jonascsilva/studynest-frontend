import { signin } from '$/query/auth'
import { userCredentials } from '$/types'
import { useCallback, createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

type DecodedToken = {
  sub: string
  email: string
  name?: string
}

type User = {
  id: string
  email: string
  name?: string
}

interface AuthContext {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  login: (userCredentials: userCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

const key = 'auth.token'

function getStoredToken() {
  return localStorage.getItem(key)
}

function getStoredUser() {
  const token = getStoredToken()

  if (token) {
    return getUserFromToken(token)
  }

  return null
}

function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(key, token)
  } else {
    localStorage.removeItem(key)
  }
}

function getUserFromToken(newToken: string) {
  const decodedToken = jwtDecode<DecodedToken>(newToken)

  const user = {
    id: decodedToken.sub,
    email: decodedToken.email,
    name: decodedToken.name
  }

  return user
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getStoredToken())
  const [user, setUser] = useState<User | null>(getStoredUser())
  const isAuthenticated = !!token

  const login = useCallback(async (userCredentials: userCredentials) => {
    const response = await signin(userCredentials)

    const token = response.access_token

    const user = getUserFromToken(token)

    setUser(user)
    setToken(token)
    setStoredToken(token)
  }, [])

  const logout = useCallback(async () => {
    setUser(null)
    setToken(null)
    setStoredToken(null)
  }, [])

  useEffect(() => {
    const user = getStoredUser()
    const token = getStoredToken()

    setUser(user)
    setToken(token)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
