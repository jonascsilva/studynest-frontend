import { describe, it, expect, vi } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/flashcards'
import { queryClient } from '$/lib/query'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { fetchFlashcards } from '$/query/flashcards'
import { FlashcardType } from '$/types'

vi.mock('$/query/flashcards', () => ({
  fetchFlashcards: vi.fn()
}))

describe('Flashcards Route', () => {
  it('should ensure query data is preloaded', async () => {
    const mockData = [
      { id: 'fake-id', question: 'What is React?', answer: 'A JavaScript library' }
    ] as FlashcardType[]

    vi.mocked(fetchFlashcards).mockResolvedValue(mockData)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    const data = queryClient.getQueryData(['flashcards'])

    expect(data).toEqual(mockData)
  })

  it('should use the correct options', async () => {
    const ensureQueryDataMock = vi
      .spyOn(queryClient, 'ensureQueryData')
      .mockResolvedValue(undefined)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    expect(ensureQueryDataMock).toHaveBeenCalledTimes(1)

    const expectedOptions = flashcardsQueryOptions()

    expect(ensureQueryDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedOptions.queryKey,
        queryFn: expect.any(Function)
      })
    )
  })
})
