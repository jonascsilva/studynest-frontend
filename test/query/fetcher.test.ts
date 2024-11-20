import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest'
import { fetcher } from '$/query/fetcher'
import { getStoredToken } from '$/lib/storage'

vi.mock('$/lib/storage')

describe('fetcher', () => {
  let originalFetch: any

  beforeEach(() => {
    originalFetch = global.fetch

    global.fetch = vi.fn()

    vi.resetAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('should call fetch with correct URL and headers without data', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken).mockReturnValue(token)

    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({ success: true }))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    const result = await fetcher(path, method)

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
    expect(result).toEqual({ success: true })
  })

  it('should call fetch with correct URL, headers, and body with data', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'POST'
    const data = { key: 'value' }

    vi.mocked(getStoredToken).mockReturnValue(token)

    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({ success: true }))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    const result = await fetcher(path, method, data)

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
    expect(result).toEqual({ success: true })
  })

  it('should handle response without application/json content-type', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken as Mock).mockReturnValue(token)

    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => 'text/plain')
      }
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    const result = await fetcher(path, method)

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(result).toBeUndefined()
  })

  it('should default method to GET when not provided', async () => {
    const token = 'test-token'
    const path = 'test-path'

    vi.mocked(getStoredToken as Mock).mockReturnValue(token)

    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({ success: true }))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    const result = await fetcher(path)

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
    expect(result).toEqual({ success: true })
  })

  it('should not set body when data is undefined', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'POST'

    vi.mocked(getStoredToken as Mock).mockReturnValue(token)

    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({ success: true }))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    const result = await fetcher(path, method)

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
    expect(result).toEqual({ success: true })
  })

  it('should handle when getStoredToken returns null', async () => {
    const token = null
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken as Mock).mockReturnValue(token)

    const mockResponse = {
      ok: true,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({ success: true }))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    const result = await fetcher(path, method)

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
    expect(result).toEqual({ success: true })
  })

  it('should handle fetch throwing an error', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken).mockReturnValue(token)

    const fetchError = new Error('Network error')

    vi.mocked(fetch as Mock).mockRejectedValue(fetchError)

    await expect(fetcher(path, method)).rejects.toThrow(fetchError)
  })

  it('should throw an error with responseBody.message when response.ok is false and responseBody has a message', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken).mockReturnValue(token)

    const mockResponse = {
      ok: false,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({ message: 'Error message from server' }))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    await expect(fetcher(path, method)).rejects.toThrow('Error message from server')

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
  })

  it('should throw a generic error when response.ok is false and responseBody has no message', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken as Mock).mockReturnValue(token)

    const mockResponse = {
      ok: false,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve({}))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    await expect(fetcher(path, method)).rejects.toThrow('Falha na requisição')

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
  })

  it('should throw a generic error when response.ok is false and responseBody is undefined', async () => {
    const token = 'test-token'
    const path = 'test-path'
    const method = 'GET'

    vi.mocked(getStoredToken as Mock).mockReturnValue(token)

    const mockResponse = {
      ok: false,
      headers: {
        get: vi.fn(() => ['application/json'])
      },
      json: vi.fn(() => Promise.resolve(undefined))
    }

    vi.mocked(fetch as Mock).mockResolvedValue(mockResponse)

    await expect(fetcher(path, method)).rejects.toThrow('Falha na requisição')

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: undefined
    })

    expect(mockResponse.headers.get).toHaveBeenCalledWith('content-type')
    expect(mockResponse.json).toHaveBeenCalled()
  })
})
