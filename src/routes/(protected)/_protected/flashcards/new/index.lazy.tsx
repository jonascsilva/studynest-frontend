import { Flashcard } from '$/cmps/Flashcard'
import { createFlashcard } from '$/query/flashcards'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

const Route = createLazyFileRoute('/(protected)/_protected/flashcards/new/')({
  component: Component
})

function Component() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['flashcards'],
    mutationFn: createFlashcard,
    onSuccess: data => {
      queryClient.setQueryData(['flashcards', { flashcardId: data.id }], data)

      navigate({
        to: '/flashcards/$flashcardId',
        params: { flashcardId: data.id }
      })
    }
  })

  return <Flashcard mutation={mutation} />
}

export { Route, Component }