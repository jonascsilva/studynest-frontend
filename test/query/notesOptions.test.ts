import { describe, it, expect, vi } from 'vitest'
import { noteQueryOptions, notesQueryOptions } from '$/query/notesOptions'
import { fetchNote, fetchNotes, NoteType } from '$/query/notes'

vi.mock('$/query/notes')

describe('noteQueryOptions', () => {
  it('should return the correct query options for a note', async () => {
    const noteId = '123'
    const options = noteQueryOptions(noteId)

    expect(options.queryKey).toEqual(['notes', { noteId }])

    vi.mocked(fetchNote).mockResolvedValueOnce({ id: noteId, content: 'Test Note' } as NoteType)

    const result = await (options.queryFn as any)()

    expect(fetchNote).toHaveBeenCalledWith(noteId)

    expect(result).toEqual({ id: noteId, content: 'Test Note' })
  })
})

describe('notesQueryOptions', () => {
  it('should return the correct query options for notes', async () => {
    const options = notesQueryOptions

    expect(options.queryKey).toEqual(['notes'])

    vi.mocked(fetchNotes).mockResolvedValueOnce([{ id: '1', content: 'Note 1' } as NoteType])

    const result = await (options.queryFn as any)()

    expect(fetchNotes).toHaveBeenCalled()
    expect(result).toEqual([{ id: '1', content: 'Note 1' }])
  })
})
