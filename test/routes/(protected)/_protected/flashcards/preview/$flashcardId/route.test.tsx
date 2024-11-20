import { expect, it, vi } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/flashcards/preview/$flashcardId'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { queryClient } from '$/lib/query'

vi.mock('$/query/flashcardsOptions')

it('should fetch flashcard data correctly', async () => {
  const flashcardMockId = '123'

  const flashcardQueryOptionsMock = {
    queryKey: ['flashcards', { flashcardId: flashcardMockId }],
    queryFn: vi.fn()
  }

  vi.mocked(flashcardQueryOptions).mockReturnValue(flashcardQueryOptionsMock as any)

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
  expect(ensureQueryDataMock).toHaveBeenCalledWith(flashcardQueryOptionsMock)
  expect(result).toBe('flashcardMock')
})
