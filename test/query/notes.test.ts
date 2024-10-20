import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchNote, fetchNotes, updateNote, createNote, deleteNote } from '$/query/notes.ts'
import { NoteType } from '$/types'

const baseUrl = 'http://localhost:3000'

beforeEach(() => {
  vi.restoreAllMocks()
})

const mockFetch = vi.fn()

vi.stubGlobal('fetch', mockFetch)

describe('fetchNote', () => {
  it('should fetch a note by ID', async () => {
    const noteId = '123'
    const mockNote: Partial<NoteType> = { id: noteId, content: 'Test Note', userId: 'user1' }

    mockFetch.mockResolvedValueOnce({
      json: async () => mockNote
    })

    const result = await fetchNote(noteId)

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/notes/123`)
    expect(result).toEqual(mockNote)
  })

  it('should throw an error when the fetch fails', async () => {
    const noteId = '123'

    mockFetch.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchNote(noteId)).rejects.toThrow('Network Error')

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/notes/123`)
  })
})

describe('fetchNotes', () => {
  it('should fetch all notes', async () => {
    const mockNotes: Partial<NoteType>[] = [
      { id: '1', content: 'Note 1', userId: 'user1' },
      { id: '2', content: 'Note 2', userId: 'user1' }
    ]

    mockFetch.mockResolvedValueOnce({
      json: async () => mockNotes
    })

    const result = await fetchNotes()

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/notes`)
    expect(result).toEqual(mockNotes)
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

    mockFetch.mockResolvedValueOnce({
      json: async () => updatedNote
    })

    const updateNoteFn = updateNote(noteId)
    const result = await updateNoteFn(updateData)

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    expect(result).toEqual(updatedNote)
  })
})

describe('createNote', () => {
  it('should create a new note and return it', async () => {
    const noteData: Partial<NoteType> = { content: 'New Note' }
    const createdNote: Partial<NoteType> = {
      id: '123',
      content: 'New Note',
      userId: '33b2c1a4-98d8-439b-a032-7b4388f7ab94'
    }

    mockFetch.mockResolvedValueOnce({
      json: async () => createdNote
    })

    const result = await createNote(noteData)

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...noteData, userId: '33b2c1a4-98d8-439b-a032-7b4388f7ab94' })
    })
    expect(result).toEqual(createdNote)
  })
})

describe('deleteNote', () => {
  it('should delete a note and return the deleted note', async () => {
    const noteId = '123'
    const deletedNote: Partial<NoteType> = { id: noteId, content: 'Deleted Note', userId: 'user1' }

    mockFetch.mockResolvedValueOnce({
      json: async () => deletedNote
    })

    const result = await deleteNote(noteId)

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE'
    })
    expect(result).toEqual(deletedNote)
  })
})
