import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderWithContext } from '../../../customRender'
import { Component } from '$/routes/(auth)/signin'
import { useAuth } from '$/hooks/useAuth'

vi.mock('$/hooks/useAuth')

describe('SignIn Component', () => {
  const loginMock = vi.fn()

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      login: loginMock,
      isAuthenticated: false
    } as any)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the sign-in form', () => {
    renderWithContext(Component)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
  })

  it('should show validation error for invalid password', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Email'), 'test@test')
    await user.type(screen.getByLabelText('Senha'), '1234')

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText('O comprimento mínimo é 6')).toBeInTheDocument()
  })

  it('should submit the form with valid data', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(loginMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    })
  })
})
