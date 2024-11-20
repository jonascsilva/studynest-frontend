import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Component } from '$/routes/index.lazy'
import { useAuth } from '$/hooks/useAuth'
import { renderWithContext } from '../customRender'
import { AuthContextType } from '$/contexts/AuthContext'

vi.mock('$/hooks/useAuth')

describe('HomePage Component', () => {
  it('should render correctly when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null } as AuthContextType)

    renderWithContext(Component)

    const headingElement = screen.getByRole('heading', { level: 1 })

    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('StudyNest')

    const signInButton = screen.getByRole('button', { name: 'Entrar' })
    const signUpButton = screen.getByRole('button', { name: 'Criar conta' })

    expect(signInButton).toBeInTheDocument()
    expect(signUpButton).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'Dashboard' })).not.toBeInTheDocument()

    const signInLink = signInButton.closest('a')

    expect(signInLink).toHaveAttribute('href', '/signin')

    const signUpLink = signUpButton.closest('a')

    expect(signUpLink).toHaveAttribute('href', '/signup')
    expect(screen.getByText('PLACEHOLDER')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Aprenda hoje, lembre-se para sempre!' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Sua ferramenta completa para um aprendizado eficiente.')
    ).toBeInTheDocument()
  })

  it('should render correctly when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ user: { name: 'Test User' } } as AuthContextType)

    renderWithContext(Component)

    const headingElement = screen.getByRole('heading', { level: 1 })

    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('StudyNest')

    const dashboardButton = screen.getByRole('button', { name: 'Dashboard' })

    expect(dashboardButton).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'Entrar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Criar conta' })).not.toBeInTheDocument()

    const dashboardLink = dashboardButton.closest('a')

    expect(dashboardLink).toHaveAttribute('href', '/home')
    expect(screen.getByText('PLACEHOLDER')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Aprenda hoje, lembre-se para sempre!' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Sua ferramenta completa para um aprendizado eficiente.')
    ).toBeInTheDocument()
  })
})
