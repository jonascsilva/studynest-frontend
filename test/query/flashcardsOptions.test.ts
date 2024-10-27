import { describe, it, expect, vi } from 'vitest'
import { flashcardQueryOptions, flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { fetchFlashcard, fetchFlashcards, FlashcardType } from '$/query/flashcards'

vi.mock('$/query/flashcards')

describe('flashcardQueryOptions', () => {
  it('should return the correct query options for a flashcard', async () => {
    const flashcardId = '123'
    const options = flashcardQueryOptions(flashcardId)

    expect(options.queryKey).toEqual(['flashcards', { flashcardId }])

    vi.mocked(fetchFlashcard).mockResolvedValueOnce({
      id: flashcardId,
      question: 'Test Flashcard'
    } as FlashcardType)

    const result = await (options.queryFn as any)()

    expect(fetchFlashcard).toHaveBeenCalledWith(flashcardId)

    expect(result).toEqual({ id: flashcardId, question: 'Test Flashcard' })
  })
})

describe('flashcardsQueryOptions', () => {
  it('should return the correct query options for flashcards', async () => {
    const options = flashcardsQueryOptions

    expect(options.queryKey).toEqual(['flashcards'])

    vi.mocked(fetchFlashcards).mockResolvedValueOnce([
      { id: '1', question: 'Flashcard 1' } as FlashcardType
    ])

    const result = await (options.queryFn as any)()

    expect(fetchFlashcard).toHaveBeenCalled()
    expect(result).toEqual([{ id: '1', question: 'Flashcard 1' }])
  })
})
