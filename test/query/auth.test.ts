import { signin } from '$/query/auth'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('signin function', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('sends a POST request to the correct URL with the correct data', async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ token: 'test-token' })
    }

    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const data = { email: 'test@example.com', password: 'password123' }

    const result = await signin(data)

    expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    expect(mockResponse.json).toHaveBeenCalled()
    expect(result).toEqual({ token: 'test-token' })
  })

  it('handles fetch errors', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network Error'))

    const data = { email: 'test@example.com', password: 'password123' }

    await expect(signin(data)).rejects.toThrow('Network Error')
  })
})
