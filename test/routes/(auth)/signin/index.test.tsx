import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest'
import { Component } from '$/routes/(auth)/signin/index.lazy'
import { renderWithContext } from '../../../customRender'

describe('SignIn Component', () => {
  let consoleLogSpy: MockInstance

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the sign-in form', () => {
    renderWithContext(Component)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
  })

  it('shows validation error for invalid password', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Email'), 'test@test')
    await user.type(screen.getByLabelText('Senha'), '1234')

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText('O comprimento mínimo é 6')).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(consoleLogSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    })

    consoleLogSpy.mockRestore()
  })
})
