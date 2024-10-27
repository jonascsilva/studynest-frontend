import { signin } from '$/query/auth'
import { userCredentials } from '$/types'
import { useCallback, createContext, useState, PropsWithChildren, useMemo } from 'react'
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

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  login: (credentials: userCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

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

function getUserFromToken(token: string): User | null {
  try {
    const decoded = jwtDecode<DecodedToken>(token)

    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name
    }
  } catch (error) {
    console.error('Failed to decode token:', error)

    return null
  }
}

const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [token, setToken] = useState<string | null>(getStoredToken())
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = getStoredToken()

    return storedToken ? getUserFromToken(storedToken) : null
  })
  const isAuthenticated = Boolean(token)

  const login = useCallback(async (credentials: userCredentials) => {
    try {
      const response = await signin(credentials)
      const accessToken = response.access_token

      if (!accessToken) {
        throw new Error('No access token in response')
      }

      const userData = getUserFromToken(accessToken)

      if (!userData) {
        throw new Error('Invalid token')
      }

      setToken(accessToken)
      setUser(userData)
      setStoredToken(accessToken)
    } catch (error) {
      console.error('Login failed:', error)

      throw error
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setStoredToken(null)
  }, [])

  const contextValue = useMemo(
    () => ({ isAuthenticated, token, user, login, logout }),
    [isAuthenticated, token, user, login, logout]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
export type { AuthContextType }
