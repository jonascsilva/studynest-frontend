import { createFileRoute } from '@tanstack/react-router'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { updateFlashcard } from '$/query/flashcards'
import { Flashcard } from '$/components/Flashcard'

const Route = createFileRoute('/(protected)/_protected/flashcards/edit/$flashcardId/')({
  loader: ({ context: { queryClient }, params: { flashcardId } }) => {
    return queryClient.ensureQueryData(flashcardQueryOptions(flashcardId))
  },
  component: Component
})

function Component() {
  const { flashcardId } = Route.useParams()
  const queryClient = useQueryClient()
  const { data: flashcard } = useSuspenseQuery(flashcardQueryOptions(flashcardId))

  const mutation = useMutation({
    mutationKey: ['flashcards'],
    mutationFn: updateFlashcard(flashcardId),
    onSuccess: data => {
      queryClient.setQueryData(['flashcards', { flashcardId: data.id }], data)
    }
  })

  return <Flashcard mutation={mutation} flashcard={flashcard} />
}

export { Route, Component }
