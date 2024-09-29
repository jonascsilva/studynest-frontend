import { queryOptions } from '@tanstack/react-query'
import { fetchNote, fetchNotes } from './notes'

const noteQueryOptions = (noteId: string) =>
  queryOptions({
    queryKey: ['notes', { noteId }],
    queryFn: () => fetchNote(noteId)
  })

const notesQueryOptions = queryOptions({
  queryKey: ['notes'],
  queryFn: () => fetchNotes()
})

export { noteQueryOptions, notesQueryOptions }
