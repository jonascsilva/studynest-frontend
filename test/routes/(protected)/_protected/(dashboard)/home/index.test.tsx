import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/home/index'
import { useAuth } from '$/hooks/useAuth'
import { AuthContextType } from '$/contexts/AuthContext'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'

vi.mock('$/hooks/useAuth')

vi.mock(import('$/query/flashcardsOptions'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    flashcardsQueryOptions: vi.fn().mockReturnValue({ queryFn: vi.fn() })
  }
})

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

describe('Home Component', () => {
  const flashcardsMock = [
    {
      id: '1',
      question: 'Question 1',
      subject: 'Subject 1',
      updatedAt: '2023-01-01',
      currentLevel: 1,
      nextRevisionDate: '2024-11-11'
    },
    {
      id: '2',
      question: 'Question 2',
      subject: 'Subject 2',
      updatedAt: '2023-01-02',
      currentLevel: 1,
      nextRevisionDate: '2024-11-11'
    }
  ]

  beforeEach(() => {
    vi.mocked(flashcardsQueryOptions({ due: true }).queryFn as Mock).mockResolvedValue(
      flashcardsMock
    )
    vi.mocked(useSuspenseQuery).mockReturnValue({ data: flashcardsMock } as UseSuspenseQueryResult<
      unknown,
      unknown
    >)
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

    expect(screen.getByText(/Você tem/i)).toBeInTheDocument()
    expect(screen.getByText(/2/i)).toBeInTheDocument()
    expect(screen.getByText(/flashcards para revisar/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /começar revisão/i })).toBeInTheDocument()
  })
})
