import { renderHook } from '@testing-library/react'
import { useAuth } from '$/hooks/useAuth'
import { AuthContext } from '$/contexts/auth'
import { describe, it, expect, vi } from 'vitest'

describe('useAuth hook', () => {
  it('should return the context when used within AuthProvider', () => {
    const mockAuthContextValue = {
      user: { id: 'fake-id', name: 'Test User', email: 'test@example.com' },
      login: vi.fn(),
      logout: vi.fn(),
      token: 'fake-token',
      isAuthenticated: true
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockAuthContextValue}>{children}</AuthContext.Provider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toEqual(mockAuthContextValue)
  })

  it('should throw error when used outside of AuthProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within an AuthProvider')

    consoleErrorSpy.mockRestore()
  })
})
