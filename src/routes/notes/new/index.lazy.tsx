import { Note } from '$/cmps/Note'
import { createNote } from '$/query/notes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

const Route = createLazyFileRoute('/notes/new/')({
  component: Index
})

function Index() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['notes'],
    mutationFn: createNote,
    onSuccess: data => {
      queryClient.setQueryData(['notes', { noteId: data.id }], data)

      navigate({ to: '/notes/$noteId', params: { noteId: data.id } })
    }
  })

  return <Note mutation={mutation} />
}

export { Route, Index }
