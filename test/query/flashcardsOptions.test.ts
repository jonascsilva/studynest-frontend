import { describe, it, expect, vi, Mock } from 'vitest'
import { flashcardQueryOptions, flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { fetchFlashcard, fetchFlashcards } from '$/query/flashcards'

vi.mock('$/query/flashcards', () => ({
  fetchFlashcard: vi.fn(),
  fetchFlashcards: vi.fn()
}))

describe('flashcardQueryOptions', () => {
  it('should return the correct query options for a flashcard', async () => {
    const flashcardId = '123'
    const options = flashcardQueryOptions(flashcardId)

    expect(options.queryKey).toEqual(['flashcards', { flashcardId }])

    const mockFetchFlashcard = fetchFlashcard as Mock

    mockFetchFlashcard.mockResolvedValueOnce({ id: flashcardId, content: 'Test Flashcard' })

    const result = await (options.queryFn as any)()

    expect(mockFetchFlashcard).toHaveBeenCalledWith(flashcardId)

    expect(result).toEqual({ id: flashcardId, content: 'Test Flashcard' })
  })
})

describe('flashcardsQueryOptions', () => {
  it('should return the correct query options for flashcards', async () => {
    const options = flashcardsQueryOptions

    expect(options.queryKey).toEqual(['flashcards'])

    const mockFetchFlashcards = fetchFlashcards as Mock

    mockFetchFlashcards.mockResolvedValueOnce([{ id: '1', content: 'Flashcard 1' }])

    const result = await (options.queryFn as any)()

    expect(mockFetchFlashcards).toHaveBeenCalled()
    expect(result).toEqual([{ id: '1', content: 'Flashcard 1' }])
  })
})
