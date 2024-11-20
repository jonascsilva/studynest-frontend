import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  generateFlashcard,
  fetchFlashcard,
  fetchFlashcards,
  updateFlashcard,
  createFlashcard,
  deleteFlashcard,
  reviewFlashcard,
  generateFlashcards
} from '$/query/flashcards'
import { FlashcardType } from '$/types'
import { fetcher } from '$/query/fetcher'

vi.mock('$/query/fetcher')

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('generateFlashcard', () => {
  it('should generate the content of a flashcard', async () => {
    const question = 'What is the capital of France?'
    const subject = 'Geography'

    const responseMock = {
      answer: 'Paris'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(responseMock)

    const result = await generateFlashcard({ subject, question })

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(responseMock)
  })
})

describe('generateFlashcards', () => {
  it('should generate flashcards from a note', async () => {
    const noteId = 'fake-note-id'

    const responseMock = [
      {
        question: 'What is the capital of France?',
        subject: 'Geography',
        answer: 'Paris'
      }
    ]

    vi.mocked(fetcher).mockResolvedValueOnce(responseMock)

    const result = await generateFlashcards(noteId)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(responseMock)
  })
})

describe('fetchFlashcard', () => {
  it('should fetch a flashcard by ID', async () => {
    const flashcardId = '123'
    const mockFlashcard: Partial<FlashcardType> = {
      id: flashcardId,
      answer: 'Test Flashcard',
      userId: 'user1'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(mockFlashcard)

    const result = await fetchFlashcard(flashcardId)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(mockFlashcard)
  })
})

describe('fetchFlashcards', () => {
  it('should fetch all flashcards', async () => {
    const mockFlashcards: Partial<FlashcardType>[] = [
      { id: '1', answer: 'Flashcard 1', userId: 'user1' },
      { id: '2', answer: 'Flashcard 2', userId: 'user1' }
    ]

    vi.mocked(fetcher).mockResolvedValueOnce(mockFlashcards)

    const result = await fetchFlashcards()

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(mockFlashcards)
  })
})

describe('updateFlashcard', () => {
  it('should update a flashcard and return the updated flashcard', async () => {
    const flashcardId = 'fake-falshcard-id'
    const updateData: Partial<FlashcardType> = { answer: 'Updated Content' }
    const updatedFlashcard: Partial<FlashcardType> = {
      id: flashcardId,
      answer: 'Updated Content',
      userId: 'user1'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(updatedFlashcard)

    const updateFlashcardFn = updateFlashcard(flashcardId)
    const result = await updateFlashcardFn(updateData)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(updatedFlashcard)
  })
})

describe('reviewFlashcard', () => {
  it('should review a flashcard', async () => {
    const flashcardId = 'fake-falshcard-id'
    const result = 1
    const reviewData = { result }

    const reviewFlashcardFn = reviewFlashcard(flashcardId)
    await reviewFlashcardFn(reviewData)

    expect(fetcher).toHaveBeenCalledOnce()
  })
})

describe('createFlashcard', () => {
  it('should create a new flashcard and return it', async () => {
    const flashcardData: Partial<FlashcardType> = {
      answer: 'New Flashcard',
      userId: 'fake-user-id'
    }
    const createdFlashcard: Partial<FlashcardType> = {
      id: '123',
      answer: 'New Flashcard',
      userId: 'fake-user-id'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(createdFlashcard)

    const result = await createFlashcard(flashcardData)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(createdFlashcard)
  })
})

describe('deleteFlashcard', () => {
  it('should delete a flashcard and return the deleted flashcard', async () => {
    const flashcardId = '123'
    const deletedFlashcard: Partial<FlashcardType> = {
      id: flashcardId,
      answer: 'Deleted Flashcard',
      userId: 'user1'
    }

    vi.mocked(fetcher).mockResolvedValueOnce(deletedFlashcard)

    const result = await deleteFlashcard(flashcardId)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(deletedFlashcard)
  })
})
