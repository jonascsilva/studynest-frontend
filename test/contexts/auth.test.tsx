import { useContext } from 'react'
import { render, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthProvider, AuthContext } from '$/contexts/auth'
import { signin } from '$/query/auth'
import { jwtDecode } from 'jwt-decode'
import { UserCredentials } from '$/types'

vi.mock('$/query/auth')
vi.mock('jwt-decode')

describe('AuthContext', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    localStorage.clear()
  })

  it('should initialize with stored token and user', () => {
    const mockToken = 'test-token'
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }

    localStorage.setItem('auth.token', mockToken)

    vi.mocked(jwtDecode).mockReturnValue({
      sub: mockUser.id,
      email: mockUser.email,
      name: mockUser.name
    })

    let contextValue: any

    function TestComponent() {
      contextValue = useContext(AuthContext)

      return null
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(contextValue).toBeDefined()
    expect(contextValue.token).toBe(mockToken)
    expect(contextValue.user).toEqual(mockUser)
    expect(contextValue.isAuthenticated).toBe(true)
  })

  it('should initialize with invalid stored token', () => {
    const mockToken = 'invalid-token'

    localStorage.setItem('auth.token', mockToken)

    const error = new Error('Invalid token')

    vi.mocked(jwtDecode).mockImplementation(() => {
      throw error
    })

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    let contextValue: any

    function TestComponent() {
      contextValue = useContext(AuthContext)
      return null
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(contextValue).toBeDefined()
    expect(contextValue.token).toBe(mockToken)
    expect(contextValue.user).toBeNull()
    expect(contextValue.isAuthenticated).toBe(true)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', error)

    consoleErrorSpy.mockRestore()
  })

  describe('login function', () => {
    it('should update token and user', async () => {
      const mockToken = 'test-token'
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      const credentials: UserCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(signin).mockResolvedValue({ access_token: mockToken })
      vi.mocked(jwtDecode).mockReturnValue({
        sub: mockUser.id,
        email: mockUser.email,
        name: mockUser.name
      })

      let contextValue: any

      function TestComponent() {
        contextValue = useContext(AuthContext)

        return null
      }

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      await act(async () => {
        await contextValue.login(credentials)
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(contextValue.token).toBe(mockToken)
      expect(contextValue.user).toEqual(mockUser)
      expect(contextValue.isAuthenticated).toBe(true)
      expect(localStorage.getItem('auth.token')).toBe(mockToken)
    })

    it('login function handles missing access_token', async () => {
      const credentials: UserCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(signin).mockResolvedValue({})

      let contextValue: any
      let caughtError: any

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      function TestComponent() {
        contextValue = useContext(AuthContext)

        return null
      }

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      await act(async () => {
        try {
          await contextValue.login(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(caughtError).toEqual(new Error('No access token in response'))
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
      expect(localStorage.getItem('auth.token')).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Login failed:',
        new Error('No access token in response')
      )

      consoleErrorSpy.mockRestore()
    })

    it('login function handles invalid token', async () => {
      const mockToken = 'invalid-token'
      const credentials: UserCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(signin).mockResolvedValue({ access_token: mockToken })
      const error = new Error('Invalid token')

      vi.mocked(jwtDecode).mockImplementation(() => {
        throw error
      })

      let contextValue: any
      let caughtError: any

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      function TestComponent() {
        contextValue = useContext(AuthContext)

        return null
      }

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      await act(async () => {
        try {
          await contextValue.login(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(caughtError).toEqual(new Error('Invalid token'))
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
      expect(localStorage.getItem('auth.token')).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', error)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Login failed:', new Error('Invalid token'))

      consoleErrorSpy.mockRestore()
    })

    it('handles login errors from signin', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const credentials: UserCredentials = { email: 'test@example.com', password: 'password123' }

      const error = new Error('Network Error')

      vi.mocked(signin).mockRejectedValue(error)

      let contextValue: any
      let caughtError: any

      function TestComponent() {
        contextValue = useContext(AuthContext)

        return null
      }

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      await act(async () => {
        try {
          await contextValue.login(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(caughtError).toBe(error)
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
      expect(localStorage.getItem('auth.token')).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalledWith('Login failed:', error)

      consoleErrorSpy.mockRestore()
    })

    it('logout function clears token and user', () => {
      const mockToken = 'test-token'
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }

      localStorage.setItem('auth.token', mockToken)

      vi.mocked(jwtDecode).mockReturnValue({
        sub: mockUser.id,
        email: mockUser.email,
        name: mockUser.name
      })

      let contextValue: any

      function TestComponent() {
        contextValue = useContext(AuthContext)
        return null
      }

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      expect(contextValue.isAuthenticated).toBe(true)

      act(() => {
        contextValue.logout()
      })

      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
      expect(localStorage.getItem('auth.token')).toBeNull()
    })
  })
})
