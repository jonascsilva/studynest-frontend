import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/flashcards'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { deleteFlashcard } from '$/query/flashcards'

vi.mock('$/query/flashcardsOptions')
vi.mock('$/query/flashcards')

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

describe('Flashcards Component', () => {
  const flashcardsMock = [
    {
      id: '1',
      question: 'Question 1',
      subject: 'Subject 1',
      updatedAt: '2023-01-01'
    },
    {
      id: '2',
      question: 'Question 2',
      subject: 'Subject 2',
      updatedAt: '2023-01-02'
    }
  ]

  beforeEach(() => {
    vi.mocked(flashcardsQueryOptions.queryFn as Mock).mockResolvedValue(flashcardsMock)
    vi.mocked(useSuspenseQuery).mockReturnValue({ data: flashcardsMock } as UseSuspenseQueryResult<
      unknown,
      unknown
    >)
  })

  it('should render the flashcards list', async () => {
    renderWithContext(Component)

    expect(screen.getByRole('heading', { name: /flashcards/i })).toBeInTheDocument()

    flashcardsMock.forEach(flashcard => {
      expect(screen.getByText(flashcard.question)).toBeInTheDocument()
      expect(screen.getByText(flashcard.subject)).toBeInTheDocument()
      expect(screen.getByText(flashcard.updatedAt)).toBeInTheDocument()
    })
  })

  it('should call deleteFlashcard when delete button is clicked', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })

    expect(deleteButtons.length).toBe(flashcardsMock.length)

    await user.click(deleteButtons[0])

    expect(deleteFlashcard).toHaveBeenCalledWith(flashcardsMock[0].id)
  })
})
