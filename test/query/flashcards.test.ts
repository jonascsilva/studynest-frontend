import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  generateFlashcard,
  fetchFlashcard,
  fetchFlashcards,
  updateFlashcard,
  createFlashcard,
  deleteFlashcard
} from '$/query/flashcards'
import { FlashcardType } from '$/types'

beforeEach(() => {
  vi.restoreAllMocks()
})

const mockFetch = vi.fn()

vi.stubGlobal('fetch', mockFetch)

describe('generateFlashcard', () => {
  it('should generate a flashcard', async () => {
    const mockFlashcard: Partial<FlashcardType> = {
      id: '123',
      answer: 'Test Flashcard',
      userId: 'user1'
    }

    mockFetch.mockResolvedValueOnce({
      json: async () => mockFlashcard
    })

    const result = await generateFlashcard()

    expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/flashcards/ai')
    expect(result).toEqual(mockFlashcard)
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

    mockFetch.mockResolvedValueOnce({
      json: async () => mockFlashcard
    })

    const result = await fetchFlashcard(flashcardId)

    expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/flashcards/123')
    expect(result).toEqual(mockFlashcard)
  })

  it('should throw an error when the fetch fails', async () => {
    const flashcardId = '123'

    mockFetch.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchFlashcard(flashcardId)).rejects.toThrow('Network Error')

    expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/flashcards/123')
  })
})

describe('fetchFlashcards', () => {
  it('should fetch all flashcards', async () => {
    const mockFlashcards: Partial<FlashcardType>[] = [
      { id: '1', answer: 'Flashcard 1', userId: 'user1' },
      { id: '2', answer: 'Flashcard 2', userId: 'user1' }
    ]

    mockFetch.mockResolvedValueOnce({
      json: async () => mockFlashcards
    })

    const result = await fetchFlashcards()

    expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/flashcards')
    expect(result).toEqual(mockFlashcards)
  })
})

describe('updateFlashcard', () => {
  it('should update a flashcard and return the updated flashcard', async () => {
    const flashcardId = '123'
    const updateData: Partial<FlashcardType> = { answer: 'Updated Content' }
    const updatedFlashcard: Partial<FlashcardType> = {
      id: flashcardId,
      answer: 'Updated Content',
      userId: 'user1'
    }

    mockFetch.mockResolvedValueOnce({
      json: async () => updatedFlashcard
    })

    const updateFlashcardFn = updateFlashcard(flashcardId)
    const result = await updateFlashcardFn(updateData)

    expect(fetch).toHaveBeenCalledWith(`https://fakeurl.com/flashcards/${flashcardId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    expect(result).toEqual(updatedFlashcard)
  })
})

describe('createFlashcard', () => {
  it('should create a new flashcard and return it', async () => {
    const flashcardData: Partial<FlashcardType> = { answer: 'New Flashcard' }
    const createdFlashcard: Partial<FlashcardType> = {
      id: '123',
      answer: 'New Flashcard',
      userId: '33b2c1a4-98d8-439b-a032-7b4388f7ab94'
    }

    mockFetch.mockResolvedValueOnce({
      json: async () => createdFlashcard
    })

    const result = await createFlashcard(flashcardData)

    expect(fetch).toHaveBeenCalledWith('https://fakeurl.com/flashcards', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...flashcardData, userId: '33b2c1a4-98d8-439b-a032-7b4388f7ab94' })
    })
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

    mockFetch.mockResolvedValueOnce({
      json: async () => deletedFlashcard
    })

    const result = await deleteFlashcard(flashcardId)

    expect(fetch).toHaveBeenCalledWith(`https://fakeurl.com/flashcards/${flashcardId}`, {
      method: 'DELETE'
    })
    expect(result).toEqual(deletedFlashcard)
  })
})
