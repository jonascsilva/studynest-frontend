import { createFileRoute } from '@tanstack/react-router'
import { noteQueryOptions } from '$/query/notesOptions'
import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { updateNote } from '$/query/notes'
import { Note } from '$/components/Note'

const Route = createFileRoute('/(protected)/_protected/notes/edit/$noteId/')({
  loader: ({ context: { queryClient }, params: { noteId } }) => {
    return queryClient.ensureQueryData(noteQueryOptions(noteId))
  },
  component: Component
})

function Component() {
  const { noteId } = Route.useParams()
  const queryClient = useQueryClient()
  const { data: note } = useSuspenseQuery(noteQueryOptions(noteId))

  const mutation = useMutation({
    mutationKey: ['editNote'],
    mutationFn: updateNote(noteId),
    onSuccess: data => {
      queryClient.setQueryData(['notes', data.id], data)
    }
  })

  return <Note mutation={mutation} note={note} />
}

export { Route, Component }
