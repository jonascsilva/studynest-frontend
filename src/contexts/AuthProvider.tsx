import * as authQuery from '$/query/auth'
import { AuthResponse, AuthUser, SignInCredentials, SignUpCredentials } from '$/types'
import { useCallback, useState, PropsWithChildren, useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getStoredToken, setStoredToken } from '$/lib/storage'
import { AuthContext } from './AuthContext'

type DecodedToken = {
  sub: string
  email: string
  name?: string
}

function getUserFromToken(token: string): AuthUser | null {
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
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedToken = getStoredToken()

    return storedToken ? getUserFromToken(storedToken) : null
  })
  const isAuthenticated = Boolean(token)

  const handleAuthenticationResult = useCallback((response: AuthResponse) => {
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
  }, [])

  const signin = useCallback(
    async (credentials: SignInCredentials) => {
      const response = await authQuery.signin(credentials)

      handleAuthenticationResult(response)
    },
    [handleAuthenticationResult]
  )

  const signup = useCallback(
    async (credentials: SignUpCredentials) => {
      const response = await authQuery.signup(credentials)

      handleAuthenticationResult(response)
    },
    [handleAuthenticationResult]
  )

  const signout = useCallback(() => {
    setUser(null)
    setToken(null)
    setStoredToken(null)
  }, [])

  const contextValue = useMemo(
    () => ({ isAuthenticated, token, user, signin, signup, signout }),
    [isAuthenticated, token, user, signin, signup, signout]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthProvider }
