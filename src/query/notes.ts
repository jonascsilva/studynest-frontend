import { NoteType } from '$/types'
import { fetcher } from '$/query/fetcher'

async function generateNote(data: {
  subject: string
  title: string
}): Promise<{ content: string }> {
  const note = await fetcher<{ content: string }>(`notes/generate`, 'POST', data)

  return note
}

async function fetchNote(noteId: string): Promise<NoteType> {
  const note = await fetcher<NoteType>(`notes/${noteId}`)

  return note
}

async function fetchNotes(): Promise<NoteType[]> {
  const notes = await fetcher<NoteType[]>('notes')

  return notes
}

function updateNote(noteId: string) {
  return async (data: Partial<NoteType>): Promise<NoteType> => {
    const note = await fetcher<NoteType>(`notes/${noteId}`, 'PATCH', data)

    return note
  }
}

async function createNote(data: Partial<NoteType>): Promise<NoteType> {
  const note = await fetcher<NoteType>('notes', 'POST', data)

  return note
}

async function deleteNote(noteId: string): Promise<NoteType> {
  const note = await fetcher<NoteType>(`notes/${noteId}`, 'DELETE')

  return note
}

export { generateNote, fetchNote, fetchNotes, updateNote, createNote, deleteNote }
