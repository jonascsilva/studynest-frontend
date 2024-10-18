import { FlashcardType } from '$/types'

const baseUrl = 'http://localhost:3000'

const generateFlashcard = async (): Promise<FlashcardType> => {
  const flashcard = fetch(`${baseUrl}/flashcards/ai`).then(res => res.json())

  return flashcard
}

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

const createFlashcard = async (data: Partial<FlashcardType>): Promise<FlashcardType> => {
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

const deleteFlashcard = async (flashcardId: string): Promise<FlashcardType> => {
  const response = await fetch(`${baseUrl}/flashcards/${flashcardId}`, {
    method: 'DELETE'
  })

  const result = response.json()

  return result
}

export type { FlashcardType }

export {
  generateFlashcard,
  fetchFlashcards,
  fetchFlashcard,
  updateFlashcard,
  createFlashcard,
  deleteFlashcard
}
