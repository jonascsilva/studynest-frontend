import { queryOptions } from '@tanstack/react-query'
import { fetchFlashcard, fetchFlashcards } from './flashcards'

const flashcardQueryOptions = (flashcardId: string) =>
  queryOptions({
    queryKey: ['flashcards', { flashcardId }],
    queryFn: () => fetchFlashcard(flashcardId)
  })

const flashcardsQueryOptions = queryOptions({
  queryKey: ['flashcards'],
  queryFn: () => fetchFlashcards()
})

export { flashcardQueryOptions, flashcardsQueryOptions }
