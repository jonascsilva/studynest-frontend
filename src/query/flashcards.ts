import { FlashcardType } from '$/types'

const baseUrl = 'http://localhost:3000'

const fetchFlashcard = async (flashcardId: string): Promise<FlashcardType> => {
  const flashcard = fetch(`${baseUrl}/flashcards/${flashcardId}`).then(res => res.json())

  return flashcard
}

const fetchFlashcards = async (): Promise<FlashcardType[]> => {
  const flashcards = fetch(`${baseUrl}/flashcards`).then(res => res.json())

  return flashcards
}

const updateFlashcard =
  (flashcardId: string) =>
  async (data: Partial<FlashcardType>): Promise<FlashcardType> => {
    const body = JSON.stringify(data)

    const response = await fetch(`${baseUrl}/flashcards/${flashcardId}`, {
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

const createflashcard = async (data: Partial<FlashcardType>): Promise<FlashcardType> => {
  data.userId = '33b2c1a4-98d8-439b-a032-7b4388f7ab94'

  const body = JSON.stringify(data)

  const response = await fetch(`${baseUrl}/flashcards`, {
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

const deleteflashcard = async (flashcardId: string): Promise<FlashcardType> => {
  const response = await fetch(`${baseUrl}/flashcards/${flashcardId}`, {
    method: 'DELETE'
  })

  const result = response.json()

  return result
}

export type { FlashcardType }

export { fetchFlashcards, fetchFlashcard, updateFlashcard, createflashcard, deleteflashcard }
