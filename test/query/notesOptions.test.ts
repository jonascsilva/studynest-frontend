import { describe, it, expect, vi, Mock } from 'vitest'
import { noteQueryOptions, notesQueryOptions } from '$/query/notesOptions'
import { fetchNote, fetchNotes } from '$/query/notes'

vi.mock('$/query/notes', () => ({
  fetchNote: vi.fn(),
  fetchNotes: vi.fn()
}))

describe('noteQueryOptions', () => {
  it('should return the correct query options for a note', async () => {
    const noteId = '123'
    const options = noteQueryOptions(noteId)

    expect(options.queryKey).toEqual(['notes', { noteId }])

    const mockFetchNote = fetchNote as Mock

    mockFetchNote.mockResolvedValueOnce({ id: noteId, content: 'Test Note' })

    const result = await (options.queryFn as any)()

    expect(mockFetchNote).toHaveBeenCalledWith(noteId)

    expect(result).toEqual({ id: noteId, content: 'Test Note' })
  })
})

describe('notesQueryOptions', () => {
  it('should return the correct query options for notes', async () => {
    const options = notesQueryOptions

    expect(options.queryKey).toEqual(['notes'])

    const mockFetchNotes = fetchNotes as Mock

    mockFetchNotes.mockResolvedValueOnce([{ id: '1', content: 'Note 1' }])

    const result = await (options.queryFn as any)()

    expect(mockFetchNotes).toHaveBeenCalled()
    expect(result).toEqual([{ id: '1', content: 'Note 1' }])
  })
})
