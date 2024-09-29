import { Flashcard } from '$/cmps/Flashcard'
import { queryClient } from '$/lib/query'
import { createflashcard } from '$/query/flashcards'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/flashcards/new/')({
  component: Index
})

function Index() {
  const navigate = Route.useNavigate()

  const mutation = useMutation({
    mutationKey: ['flashcards'],
    mutationFn: createflashcard,
    onSuccess: data => {
      queryClient.setQueryData(['flashcards', { flashcardId: data.id }], data)

      navigate({ to: '/flashcards/$flashcardId', params: { flashcardId: data.id } })
    }
  })

  return <Flashcard mutation={mutation} />
}
