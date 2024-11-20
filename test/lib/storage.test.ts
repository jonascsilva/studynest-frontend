import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest'
import { getStoredToken, setStoredToken } from '$/lib/storage'
import { jwtDecode } from 'jwt-decode'

vi.mock('jwt-decode')

describe('Storage Utilities', () => {
  const TOKEN_KEY = 'auth.token'
  let localStorageMock: Storage
  let consoleErrorSpy: MockInstance

  beforeEach(() => {
    const store: Record<string, string> = {}

    localStorageMock = {
      getItem: vi.fn((key: string) => {
        return store[key] || null
      }),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        Object.keys(store).forEach(key => delete store[key])
      }),
      key: vi.fn(),
      length: 0
    }

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock
    })

    vi.useFakeTimers()
    vi.clearAllMocks()

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()

    consoleErrorSpy.mockRestore()
  })

  it('should return null if no token is stored', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)

    const token = getStoredToken()

    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(token).toBeNull()
  })

  it('should return null if token is stored but has no exp in decoded token', () => {
    const token = 'token.without.exp'

    vi.mocked(localStorage.getItem).mockReturnValue(token)

    const decodedToken = {}

    vi.mocked(jwtDecode).mockReturnValue(decodedToken)

    const result = getStoredToken()

    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(jwtDecode).toHaveBeenCalledWith(token)
    expect(result).toBeNull()
  })

  it('should return null if token is stored but expired', () => {
    const token = 'expired.token'

    vi.mocked(localStorage.getItem).mockReturnValue(token)

    const expiredExp = Math.floor(Date.now() / 1000) - 60

    const decodedToken = { exp: expiredExp }

    vi.mocked(jwtDecode).mockReturnValue(decodedToken)

    const result = getStoredToken()

    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(jwtDecode).toHaveBeenCalledWith(token)
    expect(result).toBeNull()
  })

  it('should return token if token is stored and not expired', () => {
    const token = 'valid.token'

    vi.mocked(localStorage.getItem).mockReturnValue(token)

    const futureExp = Math.floor(Date.now() / 1000) + 60

    const decodedToken = { exp: futureExp }

    vi.mocked(jwtDecode).mockReturnValue(decodedToken)

    const result = getStoredToken()

    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(jwtDecode).toHaveBeenCalledWith(token)
    expect(result).toBe(token)
  })

  it('should set token in localStorage when setStoredToken is called with a token', () => {
    const token = 'new.token'

    setStoredToken(token)

    expect(localStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, token)
    expect(localStorage.removeItem).not.toHaveBeenCalled()
  })

  it('should remove token from localStorage when setStoredToken is called with null', () => {
    setStoredToken(null)

    expect(localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(localStorage.setItem).not.toHaveBeenCalled()
  })

  it('should handle exception thrown by jwtDecode, call console.error, and return null', () => {
    const token = 'invalid.token'

    vi.mocked(localStorage.getItem).mockReturnValue(token)

    const error = new Error('Invalid token')

    vi.mocked(jwtDecode).mockImplementation(() => {
      throw error
    })

    const result = getStoredToken()

    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(jwtDecode).toHaveBeenCalledWith(token)
    expect(consoleErrorSpy).toHaveBeenCalledWith(error)
    expect(result).toBeNull()
  })

  it('should return null if decoded token exp is zero', () => {
    const token = 'token.with.exp.zero'

    vi.mocked(localStorage.getItem).mockReturnValue(token)

    const decodedToken = { exp: 0 }

    vi.mocked(jwtDecode).mockReturnValue(decodedToken)

    const result = getStoredToken()

    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(jwtDecode).toHaveBeenCalledWith(token)
    expect(result).toBeNull()
  })
})
