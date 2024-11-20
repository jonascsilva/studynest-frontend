import { createFileRoute } from '@tanstack/react-router'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { FlashcardReview } from '$/components/FlashcardReview'

const Route = createFileRoute('/(protected)/_protected/flashcards/preview/$flashcardId/')({
  loader: ({ context: { queryClient }, params: { flashcardId } }) => {
    return queryClient.ensureQueryData(flashcardQueryOptions(flashcardId))
  },
  component: Component
})

function Component() {
  const { flashcardId } = Route.useParams()
  const { data: flashcard } = useSuspenseQuery(flashcardQueryOptions(flashcardId))

  return <FlashcardReview flashcard={flashcard} />
}

export { Route, Component }
