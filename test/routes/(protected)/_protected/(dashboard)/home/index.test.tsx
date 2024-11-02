import { screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/home/index.lazy'
import { useAuth } from '$/hooks/useAuth'
import { AuthContextType } from '$/contexts/auth'

vi.mock('$/hooks/useAuth')

describe('Home Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the welcome message with user name', () => {
    const authContextMock = {
      user: { id: 'fake-id', name: 'Test User', email: 'test@example.com' }
    } as AuthContextType

    vi.mocked(useAuth).mockReturnValue(authContextMock)

    renderWithContext(Component)

    expect(
      screen.getByRole('heading', {
        name: /bem vindo/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /test user/i
      })
    ).toBeInTheDocument()
  })

  it('should render the welcome message with user email if name is not available', () => {
    const authContextMock = {
      user: { id: 'fake-id', email: 'test@example.com' }
    } as AuthContextType

    vi.mocked(useAuth).mockReturnValue(authContextMock)

    renderWithContext(Component)

    expect(
      screen.getByRole('heading', {
        name: /bem vindo/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /test@example\.com/i
      })
    ).toBeInTheDocument()
  })

  it('should render the "Revisar" section with the success alert', () => {
    const authContextMock = {
      user: { id: 'fake-id', name: 'Test User', email: 'test@example.com' }
    } as AuthContextType

    vi.mocked(useAuth).mockReturnValue(authContextMock)

    renderWithContext(Component)

    expect(screen.getByRole('heading', { name: /revisar/i })).toBeInTheDocument()
    expect(screen.getByText(/nada para revisar no momento\. continue assim!/i)).toBeInTheDocument()
  })
})
