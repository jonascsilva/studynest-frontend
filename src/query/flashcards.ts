import { FlashcardsQueryOptions, FlashcardType, ReviewResult } from '$/types'
import { serializeParams } from '$/query/utils'
import { fetcher } from '$/query/fetcher'

type FlashcardInput = { question: string; answer: string; subject: string }

async function generateFlashcard(): Promise<FlashcardInput> {
  const flashcard = await fetcher<FlashcardType>(`flashcards/ai`)

  return flashcard
}

async function fetchFlashcard(flashcardId: string): Promise<FlashcardType> {
  const flashcard = await fetcher<FlashcardType>(`flashcards/${flashcardId}`)

  return flashcard
}

async function fetchFlashcards(opts: FlashcardsQueryOptions = {}): Promise<FlashcardType[]> {
  const queryString = serializeParams(opts)

  const flashcards = await fetcher<FlashcardType[]>(`flashcards?${queryString}`)

  return flashcards
}

function updateFlashcard(flashcardId: string) {
  return async (data: Partial<FlashcardType>): Promise<FlashcardType> => {
    const flashcard = await fetcher<FlashcardType>(`flashcards/${flashcardId}`, 'PATCH', data)

    return flashcard
  }
}

function reviewFlashcard(flashcardId: string) {
  return async (reviewResult: ReviewResult): Promise<void> => {
    await fetcher(`flashcards/review/${flashcardId}`, 'POST', reviewResult)
  }
}

async function createFlashcard(data: Partial<FlashcardType>): Promise<FlashcardType> {
  const flashcard = await fetcher<FlashcardType>(`flashcards`, 'POST', data)

  return flashcard
}

async function deleteFlashcard(flashcardId: string): Promise<FlashcardType> {
  const flashcard = await fetcher<FlashcardType>(`flashcards/${flashcardId}`, 'DELETE')

  return flashcard
}

export {
  generateFlashcard,
  fetchFlashcards,
  fetchFlashcard,
  updateFlashcard,
  reviewFlashcard,
  createFlashcard,
  deleteFlashcard
}
