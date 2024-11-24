import { describe, it, expect, vi } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/explore'
import { queryClient } from '$/lib/query'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { notesQueryOptions } from '$/query/notesOptions'
import { fetchFlashcards } from '$/query/flashcards'
import { FlashcardWithRevisionType, NoteType } from '$/types'
import { fetchNotes } from '$/query/notes'

vi.mock('$/query/flashcards')
vi.mock('$/query/notes')

describe('Explore Route', () => {
  it('should provide the loader with the necessary deps', async () => {
    const loaderParams = { search: { query: 'test' } }

    const deps = Route.options.loaderDeps!(loaderParams as any)

    expect(deps).toEqual({ query: 'test' })
  })

  it('should ensure query data is preloaded', async () => {
    const flashcardsMock = [
      {
        id: 'fake-id',
        question: 'What is React?',
        answer: 'A JavaScript library',
        currentLevel: 1,
        nextReviewDate: '2023-01-01'
      }
    ] as FlashcardWithRevisionType[]

    const notesMock = [
      {
        id: 'fake-id',
        title: 'React',
        content: 'React is a JavaScript library'
      }
    ] as NoteType[]

    vi.mocked(fetchFlashcards).mockResolvedValue(flashcardsMock)
    vi.mocked(fetchNotes).mockResolvedValue(notesMock)

    const loaderParams = { context: { queryClient }, deps: { query: 'test' } }

    await Route.options.loader!(loaderParams as any)

    const returnedFlashcards = queryClient.getQueryData([
      'flashcards',
      { shared: true, query: 'test' }
    ])
    const returnedNotes = queryClient.getQueryData(['notes', { shared: true, query: 'test' }])

    expect(returnedFlashcards).toEqual(flashcardsMock)
    expect(returnedNotes).toEqual(notesMock)
  })

  it('should use the correct options', async () => {
    const ensureQueryDataMock = vi
      .spyOn(queryClient, 'ensureQueryData')
      .mockResolvedValue(undefined)

    const loaderParams = { context: { queryClient }, deps: { query: 'test' } }

    await Route.options.loader!(loaderParams as any)

    expect(ensureQueryDataMock).toHaveBeenCalledTimes(2)

    const expectedFlashcardsOptions = flashcardsQueryOptions({ shared: true, query: 'test' })
    const expectedNotesOptions = notesQueryOptions({ shared: true, query: 'test' })

    expect(ensureQueryDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedFlashcardsOptions.queryKey,
        queryFn: expect.any(Function)
      })
    )
    expect(ensureQueryDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedNotesOptions.queryKey,
        queryFn: expect.any(Function)
      })
    )
  })
})
