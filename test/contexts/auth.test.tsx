import { useContext } from 'react'
import { render, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthProvider } from '$/contexts/AuthProvider'
import { AuthContext } from '$/contexts/AuthContext'
import { signin, signup } from '$/query/auth'
import { jwtDecode } from 'jwt-decode'
import { SignInCredentials } from '$/types'
import { getStoredToken } from '$/lib/storage'

vi.mock('$/query/auth')
vi.mock('jwt-decode')
vi.mock('$/lib/storage')

describe('AuthContext', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should initialize with stored token and user', () => {
    const tokenMock = 'test-token'
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }

    vi.mocked(getStoredToken).mockReturnValue(tokenMock)

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
    expect(contextValue.token).toBe(tokenMock)
    expect(contextValue.user).toEqual(mockUser)
    expect(contextValue.isAuthenticated).toBe(true)
  })

  it('should initialize with invalid stored token', () => {
    const tokenMock = 'invalid-token'

    vi.mocked(getStoredToken).mockReturnValue(tokenMock)

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
    expect(contextValue.token).toBe(tokenMock)
    expect(contextValue.user).toBeNull()
    expect(contextValue.isAuthenticated).toBe(true)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', error)

    consoleErrorSpy.mockRestore()
  })

  describe('signin function', () => {
    it('should update token and user', async () => {
      const tokenMock = 'test-token'
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(signin).mockResolvedValue({ access_token: tokenMock })
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
        await contextValue.signin(credentials)
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(contextValue.token).toBe(tokenMock)
      expect(contextValue.user).toEqual(mockUser)
      expect(contextValue.isAuthenticated).toBe(true)
    })

    it('should handle missing access_token', async () => {
      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(getStoredToken).mockReturnValue(null)

      vi.mocked(signin).mockResolvedValue({ access_token: '' })

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
          await contextValue.signin(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(caughtError).toEqual(new Error('No access token in response'))
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)

      consoleErrorSpy.mockRestore()
    })

    it('should handle invalid token', async () => {
      const tokenMock = 'invalid-token'
      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(getStoredToken).mockReturnValue(null)

      vi.mocked(signin).mockResolvedValue({ access_token: tokenMock })
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
          await contextValue.signin(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(caughtError).toEqual(new Error('Invalid token'))
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', error)

      consoleErrorSpy.mockRestore()
    })

    it('should handle errors from signin', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      const error = new Error('Network Error')

      vi.mocked(getStoredToken).mockReturnValue(null)

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
          await contextValue.signin(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signin).toHaveBeenCalledWith(credentials)
      expect(caughtError).toBe(error)
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)

      consoleErrorSpy.mockRestore()
    })
  })

  describe('signup function', () => {
    it('should update token and user', async () => {
      const tokenMock = 'test-token'
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(signup).mockResolvedValue({ access_token: tokenMock })
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
        await contextValue.signup(credentials)
      })

      expect(signup).toHaveBeenCalledWith(credentials)
      expect(contextValue.token).toBe(tokenMock)
      expect(contextValue.user).toEqual(mockUser)
      expect(contextValue.isAuthenticated).toBe(true)
    })

    it('should handle missing access_token', async () => {
      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(getStoredToken).mockReturnValue(null)

      vi.mocked(signup).mockResolvedValue({ access_token: '' })

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
          await contextValue.signup(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signup).toHaveBeenCalledWith(credentials)
      expect(caughtError).toEqual(new Error('No access token in response'))
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)

      consoleErrorSpy.mockRestore()
    })

    it('should handle invalid token', async () => {
      const tokenMock = 'invalid-token'
      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      vi.mocked(getStoredToken).mockReturnValue(null)

      vi.mocked(signup).mockResolvedValue({ access_token: tokenMock })
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
          await contextValue.signup(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signup).toHaveBeenCalledWith(credentials)
      expect(caughtError).toEqual(new Error('Invalid token'))
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', error)

      consoleErrorSpy.mockRestore()
    })

    it('should handle errors from signup', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const credentials: SignInCredentials = { email: 'test@example.com', password: 'password123' }

      const error = new Error('Network Error')

      vi.mocked(getStoredToken).mockReturnValue(null)

      vi.mocked(signup).mockRejectedValue(error)

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
          await contextValue.signup(credentials)
        } catch (e) {
          caughtError = e
        }
      })

      expect(signup).toHaveBeenCalledWith(credentials)
      expect(caughtError).toBe(error)
      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)

      consoleErrorSpy.mockRestore()
    })
  })

  describe('signout function', () => {
    it('should clear token and user', () => {
      const tokenMock = 'test-token'
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }

      vi.mocked(getStoredToken).mockReturnValue(tokenMock)

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
        contextValue.signout()
      })

      expect(contextValue.token).toBeNull()
      expect(contextValue.user).toBeNull()
      expect(contextValue.isAuthenticated).toBe(false)
    })
  })
})
