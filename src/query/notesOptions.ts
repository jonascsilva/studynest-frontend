import { QueryKey, queryOptions } from '@tanstack/react-query'
import { fetchNote, fetchNotes } from '$/query/notes'
import { NotesQueryOptions } from '$/types'

function noteQueryOptions(noteId: string) {
  return queryOptions({
    queryKey: ['notes', noteId],
    queryFn: () => fetchNote(noteId)
  })
}

function notesQueryOptions(opts?: NotesQueryOptions) {
  const queryKey: QueryKey = opts ? ['notes', opts] : ['notes']

  return queryOptions({
    queryKey: queryKey,
    queryFn: () => fetchNotes(opts)
  })
}

export { noteQueryOptions, notesQueryOptions }
