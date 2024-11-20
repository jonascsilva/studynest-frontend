import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Component } from '$/routes/(auth)/signup'
import { renderWithContext } from '../../../customRender'
import { useAuth } from '$/hooks/useAuth'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

vi.mock('$/hooks/useAuth')

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useMutation: vi.fn(({ mutationFn }) => ({ mutate: mutationFn })) as any
  }
})

describe('SignUp Component', () => {
  const mockNavigate = vi.fn()
  const signupMock = vi.fn()

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      signup: signupMock,
      isAuthenticated: false
    } as any)

    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('should render the sign-up form', () => {
    renderWithContext(Component)

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirme a Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastre-se/i })).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    expect(screen.getByText('Confirmação de senha é obrigatória')).toBeInTheDocument()
  })

  it('should show validation error for invalid password', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Nome'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@test')
    await user.type(screen.getByLabelText('Senha'), '1234')
    await user.type(screen.getByLabelText('Confirme a Senha'), '1234')

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(screen.getByText('O comprimento mínimo é 6')).toBeInTheDocument()
  })

  it('should show validation error when passwords do not match', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Nome'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.type(screen.getByLabelText('Confirme a Senha'), '654321')

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(screen.getByText('As senhas não correspondem')).toBeInTheDocument()
  })

  it('should submit the form with valid data', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Nome'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.type(screen.getByLabelText('Confirme a Senha'), '123456')

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(signupMock).toHaveBeenCalledWith({
      confirmPassword: '123456',
      email: 'test@example.com',
      name: 'Test User',
      password: '123456'
    })
  })

  it('should show validation error for invalid request', async () => {
    vi.mocked(useMutation).mockReturnValue({ error: true } as any)

    renderWithContext(Component)

    expect(screen.getByText('Credenciais incorretas')).toBeInTheDocument()
  })

  it('should redirect if user is signed in', async () => {
    vi.mocked(useAuth).mockReturnValue({
      signup: signupMock,
      isAuthenticated: true
    } as any)

    renderWithContext(Component)

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/home',
      replace: true
    })
  })
})
