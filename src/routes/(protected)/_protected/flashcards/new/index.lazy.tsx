import { Flashcard } from '$/components/Flashcard'
import { createFlashcard } from '$/query/flashcards'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

const Route = createLazyFileRoute('/(protected)/_protected/flashcards/new/')({
  component: Component
})

function Component() {
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['flashcards'],
    mutationFn: createFlashcard,
    onSuccess: data => {
      queryClient.setQueryData(['flashcards', { flashcardId: data.id }], data)

      navigate({
        to: '/flashcards/edit/$flashcardId',
        params: { flashcardId: data.id }
      })
    }
  })

  return <Flashcard mutation={mutation} />
}

export { Route, Component }
