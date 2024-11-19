import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchNote, fetchNotes, updateNote, createNote, deleteNote } from '$/query/notes'
import { NoteType } from '$/types'
import { fetcher } from '$/query/fetcher'

vi.mock('$/query/fetcher')

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchNote', () => {
  it('should fetch a note by ID', async () => {
    const noteId = '123'
    const noteMock: Partial<NoteType> = { id: noteId, content: 'Test Note', userId: 'user1' }

    vi.mocked(fetcher).mockResolvedValueOnce(noteMock)

    const result = await fetchNote(noteId)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(noteMock)
  })
})

describe('fetchNotes', () => {
  it('should fetch all notes', async () => {
    const notesMock: Partial<NoteType>[] = [
      { id: '1', content: 'Note 1', userId: 'user1' },
      { id: '2', content: 'Note 2', userId: 'user1' }
    ]

    vi.mocked(fetcher).mockResolvedValueOnce(notesMock)

    const result = await fetchNotes()

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(notesMock)
  })
})

describe('updateNote', () => {
  it('should update a note and return the updated note', async () => {
    const noteId = '123'
    const updateData: Partial<NoteType> = { content: 'Updated Content' }
    const updatedNote: Partial<NoteType> = {
      id: noteId,
      content: 'Updated Content',
      userId: 'user1'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(updatedNote)

    const updateNoteFn = updateNote(noteId)
    const result = await updateNoteFn(updateData)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(updatedNote)
  })
})

describe('createNote', () => {
  it('should create a new note and return it', async () => {
    const noteData: Partial<NoteType> = {
      content: 'New Note',
      userId: 'fake-user-id'
    }
    const createdNote: Partial<NoteType> = {
      id: '123',
      content: 'New Note',
      userId: 'fake-user-id'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(createdNote)

    const result = await createNote(noteData)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(createdNote)
  })
})

describe('deleteNote', () => {
  it('should delete a note and return the deleted note', async () => {
    const noteId = '123'
    const deletedNote: Partial<NoteType> = { id: noteId, content: 'Deleted Note', userId: 'user1' }

    vi.mocked(fetcher).mockResolvedValueOnce(deletedNote)

    const result = await deleteNote(noteId)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(deletedNote)
  })
})
