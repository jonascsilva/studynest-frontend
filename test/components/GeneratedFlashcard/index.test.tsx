import { screen } from '@testing-library/react'
import { GeneratedFlashcard } from '$/components/GeneratedFlashcard'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { useMutation } from '@tanstack/react-query'
import { FlashcardType } from '$/types'
import { renderWithContext } from '../../customRender'
import userEvent from '@testing-library/user-event'

vi.mock('$/query/flashcards', () => ({
  createFlashcard: vi.fn()
}))

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useMutation: vi.fn()
  }
})

describe('GeneratedFlashcard Component', () => {
  const flashcard = {
    question: 'What is the capital of France?',
    answer: 'Paris'
  } as FlashcardType

  let mockMutate: Mock

  beforeEach(() => {
    vi.clearAllMocks()
    mockMutate = vi.fn()
  })

  it('renders flashcard question and answer', () => {
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutate,
      isSuccess: false,
      isPending: false
    } as any)

    renderWithContext(() => <GeneratedFlashcard flashcard={flashcard} />)

    expect(screen.getByText(flashcard.question)).toBeInTheDocument()
    expect(screen.getByText(flashcard.answer)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /Salvar/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(button).not.toHaveAttribute('data-loading')
  })

  it('should call mutation.mutate with flashcard when button is clicked', async () => {
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutate,
      isSuccess: false,
      isPending: false
    } as any)

    const user = userEvent.setup()

    renderWithContext(() => <GeneratedFlashcard flashcard={flashcard} />)

    const button = screen.getByRole('button', { name: /Salvar/i })

    await user.click(button)

    expect(mockMutate).toHaveBeenCalledWith(flashcard)
  })

  it('should show loading state when mutation is pending', () => {
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutate,
      isSuccess: false,
      isPending: true
    } as any)

    renderWithContext(() => <GeneratedFlashcard flashcard={flashcard} />)

    const button = screen.getByRole('button', { name: /Salvar/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled', '')
  })

  it('should disable the button and shows "Salvo" when mutation is successful', () => {
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutate,
      isSuccess: true,
      isPending: false
    } as any)

    renderWithContext(() => <GeneratedFlashcard flashcard={flashcard} />)

    const button = screen.getByRole('button', { name: /Salvo/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled', '')
  })
})
