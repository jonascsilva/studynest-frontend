import { describe, it, expect, vi } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/flashcards'
import { queryClient } from '$/lib/query'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { fetchFlashcards } from '$/query/flashcards'
import { FlashcardWithRevisionType } from '$/types'

vi.mock('$/query/flashcards')

describe('Flashcards Route', () => {
  it('should ensure query data is preloaded', async () => {
    const dataMock = [
      {
        id: 'fake-id',
        question: 'What is React?',
        answer: 'A JavaScript library',
        currentLevel: 1,
        nextReviewDate: '2023-01-01'
      }
    ] as FlashcardWithRevisionType[]

    vi.mocked(fetchFlashcards).mockResolvedValue(dataMock)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    const data = queryClient.getQueryData(['flashcards', { due: true, upcoming: true }])

    expect(data).toEqual(dataMock)
  })

  it('should use the correct options', async () => {
    const ensureQueryDataMock = vi
      .spyOn(queryClient, 'ensureQueryData')
      .mockResolvedValue(undefined)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    expect(ensureQueryDataMock).toHaveBeenCalledTimes(1)

    const expectedOptions = flashcardsQueryOptions({ due: true, upcoming: true })

    expect(ensureQueryDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedOptions.queryKey,
        queryFn: expect.any(Function)
      })
    )
  })
})
