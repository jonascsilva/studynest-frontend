import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest'
import { Component } from '$/routes/(auth)/signup'
import { renderWithContext } from '../../../customRender'

describe('SignUp Component', () => {
  let consoleLogSpy: MockInstance

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the sign-up form', () => {
    renderWithContext(Component)

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirme a Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastre-se/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    expect(screen.getByText('Confirmação de senha é obrigatória')).toBeInTheDocument()
  })

  it('shows validation error for invalid password', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Nome'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@test')
    await user.type(screen.getByLabelText('Senha'), '1234')
    await user.type(screen.getByLabelText('Confirme a Senha'), '1234')

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(screen.getByText('O comprimento mínimo é 6')).toBeInTheDocument()
  })

  it('shows validation error when passwords do not match', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Nome'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.type(screen.getByLabelText('Confirme a Senha'), '654321')

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(screen.getByText('As senhas não correspondem')).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Nome'), 'Test User')
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.type(screen.getByLabelText('Confirme a Senha'), '123456')

    await user.click(screen.getByRole('button', { name: /cadastre-se/i }))

    expect(consoleLogSpy).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456'
    })

    consoleLogSpy.mockRestore()
  })
})
