import { AuthUser, SignInCredentials, SignUpCredentials } from '$/types'
import { createContext } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  token: string | null
  user: AuthUser | null
  signin: (credentials: SignInCredentials) => Promise<void>
  signup: (credentials: SignUpCredentials) => Promise<void>
  signout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export { AuthContext }
export type { AuthContextType }
