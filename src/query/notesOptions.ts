import { queryOptions } from '@tanstack/react-query'
import { fetchNote, fetchNotes } from './notes'

const noteQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['notes', { postId }],
    queryFn: () => fetchNote(postId)
  })

const notesQueryOptions = queryOptions({
  queryKey: ['notes'],
  queryFn: () => fetchNotes()
})

export { noteQueryOptions, notesQueryOptions }
