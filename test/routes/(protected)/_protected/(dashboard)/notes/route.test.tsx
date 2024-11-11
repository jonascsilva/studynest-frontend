import { it, expect, vi, describe } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/notes'
import { queryClient } from '$/lib/query'
import { notesQueryOptions } from '$/query/notesOptions'
import { fetchNotes } from '$/query/notes'
import { NoteType } from '$/types'

vi.mock('$/query/notes', () => ({
  fetchNotes: vi.fn()
}))

describe('Notes Route', () => {
  it('should ensure query data is preloaded', async () => {
    const mockData = [
      { id: 'fake-id', title: 'What is React?', content: 'A JavaScript library' }
    ] as NoteType[]

    vi.mocked(fetchNotes).mockResolvedValue(mockData)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    const data = queryClient.getQueryData(['notes'])

    expect(data).toEqual(mockData)
  })

  it('should use the correct options', async () => {
    const ensureQueryDataMock = vi
      .spyOn(queryClient, 'ensureQueryData')
      .mockResolvedValue(undefined)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    expect(ensureQueryDataMock).toHaveBeenCalledTimes(1)

    const expectedOptions = notesQueryOptions()

    expect(ensureQueryDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedOptions.queryKey,
        queryFn: expect.any(Function)
      })
    )
  })
})
