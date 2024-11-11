import { NoteType } from '$/types'

async function fetchNote(noteId: string): Promise<NoteType> {
  const note = fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`).then(res => res.json())

  return note
}

async function fetchNotes(): Promise<NoteType[]> {
  const notes = fetch(`${import.meta.env.VITE_BACKEND_URL}/notes`).then(res => res.json())

  return notes
}

function updateNote(noteId: string) {
  return async (data: Partial<NoteType>): Promise<NoteType> => {
    const body = JSON.stringify(data)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })

    const result = await response.json()

    return result
  }
}

async function createNote(data: Partial<NoteType>): Promise<NoteType> {
  const body = JSON.stringify(data)

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })

  const result = await response.json()

  return result
}

async function deleteNote(noteId: string): Promise<NoteType> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`, {
    method: 'DELETE'
  })

  const result = response.json()

  return result
}

export { fetchNote, fetchNotes, updateNote, createNote, deleteNote }
