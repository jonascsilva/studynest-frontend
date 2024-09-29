import { createFileRoute } from '@tanstack/react-router'
import { noteQueryOptions } from '$/query/notesOptions'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { updateNote } from '$/query/notes'
import { Note } from '$/cmps/Note'
import { queryClient } from '$/lib/query'

export const Route = createFileRoute('/notes/$noteId/')({
  loader: ({ context: { queryClient }, params: { noteId } }) => {
    return queryClient.ensureQueryData(noteQueryOptions(noteId))
  },
  component: Index
})

function Index() {
  const { noteId } = Route.useParams()
  const { data: note } = useSuspenseQuery(noteQueryOptions(noteId))

  const mutation = useMutation({
    mutationKey: ['notes'],
    mutationFn: updateNote(noteId),
    onSuccess: data => {
      queryClient.setQueryData(['notes', { noteId: data.id }], data)
    }
  })

  return <Note mutation={mutation} note={note} />
}
