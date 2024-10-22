import { NoteType } from '$/types'

const fetchNote = async (noteId: string): Promise<NoteType> => {
  const note = fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`).then(res => res.json())

  return note
}

const fetchNotes = async (): Promise<NoteType[]> => {
  const notes = fetch(`${import.meta.env.VITE_BACKEND_URL}/notes`).then(res => res.json())

  return notes
}

const updateNote =
  (noteId: string) =>
  async (data: Partial<NoteType>): Promise<NoteType> => {
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

const createNote = async (data: Partial<NoteType>): Promise<NoteType> => {
  data.userId = '33b2c1a4-98d8-439b-a032-7b4388f7ab94'

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

const deleteNote = async (noteId: string): Promise<NoteType> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`, {
    method: 'DELETE'
  })

  const result = response.json()

  return result
}

export type { NoteType }

export { fetchNote, fetchNotes, updateNote, createNote, deleteNote }
