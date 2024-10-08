import { NoteType } from '$/types'

const baseUrl = 'http://localhost:3000'

const fetchNote = async (noteId: string): Promise<NoteType> => {
  const note = fetch(`${baseUrl}/notes/${noteId}`).then(res => res.json())

  return note
}

const fetchNotes = async (): Promise<NoteType[]> => {
  const notes = fetch(`${baseUrl}/notes`).then(res => res.json())

  return notes
}

const updateNote =
  (noteId: string) =>
  async (data: Partial<NoteType>): Promise<NoteType> => {
    const body = JSON.stringify(data)

    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
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
  data.userId = '0191f730-7a29-7669-a126-b6a008ceaabd'

  const body = JSON.stringify(data)

  const response = await fetch(`${baseUrl}/notes`, {
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
  const response = await fetch(`${baseUrl}/notes/${noteId}`, {
    method: 'DELETE'
  })

  const result = response.json()

  return result
}

export type { NoteType }

export { fetchNotes, fetchNote, updateNote, createNote, deleteNote }
