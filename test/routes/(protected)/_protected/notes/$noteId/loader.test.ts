import { expect, Mock, it, vi } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/notes/$noteId'
import { noteQueryOptions } from '$/query/notesOptions'
import { queryClient } from '$/lib/query'

vi.mock('$/query/notesOptions', () => ({
  noteQueryOptions: vi.fn()
}))

it('Route loader fetches note data correctly', async () => {
  const noteMockId = '123'

  const mockNoteQueryOptions = { queryKey: ['notes', { noteId: noteMockId }], queryFn: vi.fn() }

  ;(noteQueryOptions as Mock).mockReturnValue(mockNoteQueryOptions)

  const ensureQueryDataMock = vi.fn().mockResolvedValue('noteMock')

  queryClient.ensureQueryData = ensureQueryDataMock

  const loaderParams = {
    context: {
      queryClient
    },
    params: {
      noteId: noteMockId
    }
  }

  const result = await Route.options.loader!(loaderParams as any)

  expect(noteQueryOptions).toHaveBeenCalledWith(noteMockId)
  expect(ensureQueryDataMock).toHaveBeenCalledWith(mockNoteQueryOptions)
  expect(result).toBe('noteMock')
})
