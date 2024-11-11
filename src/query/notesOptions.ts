import { queryOptions } from '@tanstack/react-query'
import { fetchNote, fetchNotes } from '$/query/notes'

function noteQueryOptions(noteId: string) {
  return queryOptions({
    queryKey: ['notes', noteId],
    queryFn: () => fetchNote(noteId)
  })
}

function notesQueryOptions() {
  return queryOptions({
    queryKey: ['notes'],
    queryFn: () => fetchNotes()
  })
}

export { noteQueryOptions, notesQueryOptions }
