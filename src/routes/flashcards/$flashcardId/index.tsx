import { createFileRoute, useParams } from '@tanstack/react-router'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { updateFlashcard } from '$/query/flashcards'
import { Flashcard } from '$/cmps/Flashcard'

const Route = createFileRoute('/flashcards/$flashcardId/')({
  loader: ({ context: { queryClient }, params: { flashcardId } }) => {
    return queryClient.ensureQueryData(flashcardQueryOptions(flashcardId))
  },
  component: Index
})

function Index() {
  const { flashcardId } = useParams({ from: '/flashcards/$flashcardId/' })
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

export { Route, Index }
