import { expect, Mock, it, vi } from 'vitest'
import { Route } from '$/routes/flashcards/$flashcardId'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { queryClient } from '$/lib/query'

vi.mock('$/query/flashcardsOptions', () => ({
  flashcardQueryOptions: vi.fn()
}))

it('Route loader fetches flashcard data correctly', async () => {
  const flashcardMockId = '123'

  const mockFlashcardQueryOptions = {
    queryKey: ['flashcards', { flashcardId: flashcardMockId }],
    queryFn: vi.fn()
  }

  ;(flashcardQueryOptions as Mock).mockReturnValue(mockFlashcardQueryOptions)

  const ensureQueryDataMock = vi.fn().mockResolvedValue('flashcardMock')

  queryClient.ensureQueryData = ensureQueryDataMock

  const loaderParams = {
    context: {
      queryClient
    },
    params: {
      flashcardId: flashcardMockId
    }
  }

  const result = await Route.options.loader!(loaderParams as any)

  expect(flashcardQueryOptions).toHaveBeenCalledWith(flashcardMockId)
  expect(ensureQueryDataMock).toHaveBeenCalledWith(mockFlashcardQueryOptions)
  expect(result).toBe('flashcardMock')
})
