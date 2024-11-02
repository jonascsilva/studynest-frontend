import { Note } from '$/cmps/Note'
import { createNote } from '$/query/notes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const Route = createLazyFileRoute('/(protected)/_protected/notes/new/')({
  component: Component
})

function Component() {
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['notes'],
    mutationFn: createNote,
    onSuccess: data => {
      queryClient.setQueryData(['notes', { noteId: data.id }], data)

      navigate({ to: '/notes/edit/$noteId', params: { noteId: data.id } })
    }
  })

  return <Note mutation={mutation} />
}

export { Route, Component }
