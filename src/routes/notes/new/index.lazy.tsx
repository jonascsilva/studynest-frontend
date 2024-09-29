import { Note } from '$/cmps/Note'
import { queryClient } from '$/lib/query'
import { createNote } from '$/query/notes'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/notes/new/')({
  component: Index
})

function Index() {
  const navigate = Route.useNavigate()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: data => {
      queryClient.setQueryData(['notes', { noteId: data.id }], data)

      navigate({ to: '/notes/$noteId', params: { noteId: data.id } })
    }
  })

  return <Note mutation={mutation} />
}
