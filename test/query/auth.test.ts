import { signin, signup } from '$/query/auth'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('signin function', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('signin', () => {
    it('should send a POST request to the correct URL with the correct data', async () => {
      const mockResponse = {
        ok: true,
        headers: {
          get: vi.fn().mockReturnValue(['application/json'])
        },
        json: vi.fn().mockResolvedValue({ token: 'test-token' })
      }

      vi.mocked(fetch).mockResolvedValue(mockResponse as any)

      const data = { email: 'test@example.com', password: 'password123' }

      const result = await signin(data)

      expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/auth/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer null',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      expect(mockResponse.json).toHaveBeenCalled()
      expect(result).toEqual({ token: 'test-token' })
    })

    it('should handle fetch errors', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network Error'))

      const data = { email: 'test@example.com', password: 'password123' }

      await expect(signin(data)).rejects.toThrow('Network Error')
    })
  })

  describe('signup', () => {
    it('should send a POST request to the correct URL with the correct data', async () => {
      const mockResponse = {
        ok: true,
        headers: {
          get: vi.fn().mockReturnValue(['application/json'])
        },
        json: vi.fn().mockResolvedValue({ token: 'test-token' })
      }

      vi.mocked(fetch).mockResolvedValue(mockResponse as any)

      const data = { email: 'test@example.com', name: 'fake-name', password: 'password123' }

      const result = await signup(data)

      expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer null',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      expect(mockResponse.json).toHaveBeenCalled()
      expect(result).toEqual({ token: 'test-token' })
    })

    it('should handle fetch errors', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network Error'))

      const data = { email: 'test@example.com', name: 'fake-name', password: 'password123' }

      await expect(signup(data)).rejects.toThrow('Network Error')
    })
  })
})
