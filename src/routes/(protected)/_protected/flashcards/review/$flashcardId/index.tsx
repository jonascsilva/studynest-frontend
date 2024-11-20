import { createFileRoute } from '@tanstack/react-router'
import { flashcardQueryOptions, flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { FlashcardReview } from '$/components/FlashcardReview'
import { reviewFlashcard } from '$/query/flashcards'

const Route = createFileRoute('/(protected)/_protected/flashcards/review/$flashcardId/')({
  loader: ({ context: { queryClient }, params: { flashcardId } }) => {
    return queryClient.ensureQueryData(flashcardQueryOptions(flashcardId))
  },
  component: Component
})

function Component() {
  const queryClient = useQueryClient()
  const { flashcardId } = Route.useParams()
  const { data: flashcard } = useSuspenseQuery(flashcardQueryOptions(flashcardId))

  const mutation = useMutation({
    mutationKey: ['reviewFlashcard'],
    mutationFn: reviewFlashcard(flashcardId),
    onSuccess: async () => {
      const dueFlashcards = await queryClient.ensureQueryData(flashcardsQueryOptions({ due: true }))

      const newDueFlashcards = dueFlashcards.filter(flashcard => flashcard.id !== flashcardId)

      queryClient.setQueryData(['flashcards', { due: true }], newDueFlashcards)
    }
  })

  return <FlashcardReview flashcard={flashcard} mutation={mutation} />
}

export { Route, Component }
