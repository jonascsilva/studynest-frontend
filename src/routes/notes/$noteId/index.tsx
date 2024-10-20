import { createFileRoute, useParams } from '@tanstack/react-router'
import { noteQueryOptions } from '$/query/notesOptions'
import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { updateNote } from '$/query/notes'
import { Note } from '$/cmps/Note'

const Route = createFileRoute('/notes/$noteId/')({
  loader: ({ context: { queryClient }, params: { noteId } }) => {
    return queryClient.ensureQueryData(noteQueryOptions(noteId))
  },
  component: Component
})

function Component() {
  const { noteId } = useParams({ from: '/notes/$noteId/' })
  const { data: note } = useSuspenseQuery(noteQueryOptions(noteId))
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['notes'],
    mutationFn: updateNote(noteId),
    onSuccess: data => {
      queryClient.setQueryData(['notes', { noteId: data.id }], data)
    }
  })

  return <Note mutation={mutation} note={note} />
}

export { Route, Component }
