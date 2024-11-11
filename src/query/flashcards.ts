import { FlashcardsQueryOptions, FlashcardType } from '$/types'
import { serializeParams } from '$/query/utils'
import { getStoredToken } from '$/lib/storage'

type FlashcardInput = { question: string; answer: string; subject: string }

async function generateFlashcard(): Promise<FlashcardInput> {
  const flashcard = fetch(`${import.meta.env.VITE_BACKEND_URL}/flashcards/ai`).then(res =>
    res.json()
  )

  return flashcard
}

async function fetchFlashcard(flashcardId: string): Promise<FlashcardType> {
  const flashcard = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/flashcards/${flashcardId}`
  ).then(res => res.json())

  return flashcard
}

async function fetchFlashcards(opts: FlashcardsQueryOptions = {}): Promise<FlashcardType[]> {
  const queryString = serializeParams(opts)
  const token = getStoredToken()

  const flashcards = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flashcards?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())

  return flashcards
}

function updateFlashcard(flashcardId: string) {
  return async (data: Partial<FlashcardType>): Promise<FlashcardType> => {
    const body = JSON.stringify(data)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flashcards/${flashcardId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })

    const result = await response.json()

    return result
  }
}

function reviewFlashcard(flashcardId: string) {
  return async (result: number): Promise<void> => {
    const token = getStoredToken()
    const body = JSON.stringify({ result })

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/flashcards/review/${flashcardId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body
    })
  }
}

async function createFlashcard(data: Partial<FlashcardType>): Promise<FlashcardType> {
  const body = JSON.stringify(data)

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flashcards`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })

  const result = await response.json()

  return result
}

async function deleteFlashcard(flashcardId: string): Promise<FlashcardType> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flashcards/${flashcardId}`, {
    method: 'DELETE'
  })

  const result = response.json()

  return result
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
