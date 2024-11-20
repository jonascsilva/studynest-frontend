import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Route, Component } from '$/routes/(protected)/_protected/flashcards/review/$flashcardId'
import { useQueryClient, useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { reviewFlashcard } from '$/query/flashcards'
import { renderWithContext } from '../../../../../../customRender'
import userEvent from '@testing-library/user-event'

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useQueryClient: vi.fn(),
    useSuspenseQuery: vi.fn()
  }
})

vi.mock('$/query/flashcards')

vi.mock('$/query/flashcardsOptions', () => ({
  flashcardQueryOptions: vi.fn(),
  flashcardsQueryOptions: vi.fn().mockReturnValue({
    queryKey: ['flashcards', { due: true }]
  })
}))

vi.mock('$/components/FlashcardReview', () => ({
  FlashcardReview: ({ flashcard, mutation }: any) => (
    <div>
      <div>{flashcard.question}</div>
      <button onClick={() => mutation.mutate()}>Review</button>
    </div>
  )
}))

describe('Component', () => {
  let mockQueryClient: any
  let mockFlashcard: any
  let mockDueFlashcards: any[]

  beforeEach(() => {
    mockQueryClient = {
      ensureQueryData: vi.fn(),
      setQueryData: vi.fn()
    }

    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient)

    Route.useParams = vi.fn().mockReturnValue({ flashcardId: '1' })

    mockFlashcard = { id: '1', question: 'Question 1', answer: 'Answer 1' }
    mockDueFlashcards = [
      { id: '1', question: 'Question 1', answer: 'Answer 1' },
      { id: '2', question: 'Question 2', answer: 'Answer 2' }
    ]
  })

  it('should handle onSuccess correctly when there is a next flashcard', async () => {
    vi.mocked(useSuspenseQuery).mockReturnValue({
      data: mockDueFlashcards
    } as UseSuspenseQueryResult<unknown, unknown>)

    const mockMutateFn = vi.fn().mockResolvedValue(undefined)

    vi.mocked(reviewFlashcard).mockReturnValue(mockMutateFn)

    mockQueryClient.ensureQueryData.mockResolvedValue(mockDueFlashcards)

    const user = userEvent.setup()

    renderWithContext(() => <Component />)

    await user.click(screen.getByText('Review'))

    expect(mockMutateFn).toHaveBeenCalled()

    expect(mockQueryClient.ensureQueryData).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['flashcards', { due: true }]
      })
    )

    const expectedNewDueFlashcards = [{ id: '2', question: 'Question 2', answer: 'Answer 2' }]

    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
      ['flashcards', { due: true }],
      expectedNewDueFlashcards
    )
  })

  it('should navigate to /home when there are no more due flashcards', async () => {
    vi.mocked(useSuspenseQuery).mockReturnValue({
      data: mockFlashcard
    } as UseSuspenseQueryResult<unknown, unknown>)

    const mockMutateFn = vi.fn().mockResolvedValue(undefined)

    vi.mocked(reviewFlashcard).mockReturnValue(mockMutateFn)

    mockQueryClient.ensureQueryData.mockResolvedValue([mockFlashcard])

    const user = userEvent.setup()

    renderWithContext(() => <Component />)

    await user.click(screen.getByText('Review'))

    expect(mockMutateFn).toHaveBeenCalled()

    expect(mockQueryClient.ensureQueryData).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['flashcards', { due: true }]
      })
    )
  })
})
