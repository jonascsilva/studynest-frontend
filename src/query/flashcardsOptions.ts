import { QueryKey, queryOptions } from '@tanstack/react-query'
import { fetchFlashcard, fetchFlashcards } from '$/query/flashcards'
import { FlashcardsQueryOptions } from '$/types'

function flashcardQueryOptions(flashcardId: string) {
  return queryOptions({
    queryKey: ['flashcards', flashcardId],
    queryFn: () => fetchFlashcard(flashcardId)
  })
}

function flashcardsQueryOptions(opts?: FlashcardsQueryOptions) {
  const queryKey: QueryKey = opts ? ['flashcards', opts] : ['flashcards']

  return queryOptions({
    queryKey: queryKey,
    queryFn: () => fetchFlashcards(opts)
  })
}

export { flashcardQueryOptions, flashcardsQueryOptions }
