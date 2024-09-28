export type NoteType = {
  id: string
  title: string
  subject: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
}

export const fetchNote = async (noteId: string): Promise<NoteType> => {
  console.info(`Fetching note with id ${noteId}...`)

  const note = fetch(`http://localhost:3000/notes/${noteId}`).then(res => res.json())

  return note
}

export const fetchNotes = async (): Promise<NoteType[]> => {
  console.info('Fetching notes...')

  const notes = fetch(`http://localhost:3000/notes`).then(res => res.json())

  return notes
}
