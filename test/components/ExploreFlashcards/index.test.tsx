import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExploreFlashcards } from '$/components/ExploreFlashcards'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { createFlashcard } from '$/query/flashcards'
import { FlashcardType } from '$/types'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import userEvent from '@testing-library/user-event'

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn()
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn()
}))

vi.mock('$/query/flashcards', () => ({
  createFlashcard: vi.fn()
}))

vi.mock('react-icons/bs', () => ({
  BsEyeFill: () => <svg data-testid='bs-eye-fill-icon' />
}))

vi.mock('$/components/ui/dialog', () => ({
  DialogRoot: ({ children, open, lazyMount, ...props }: any) =>
    open ? (
      <div data-testid='dialog-root' {...props}>
        {children}
      </div>
    ) : null,
  DialogContent: ({ children, ...props }: any) => (
    <div data-testid='dialog-content' {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children, ...props }: any) => (
    <div data-testid='dialog-header' {...props}>
      {children}
    </div>
  ),
  DialogTitle: ({ children, ...props }: any) => (
    <h2 data-testid='dialog-title' {...props}>
      {children}
    </h2>
  ),
  DialogBody: ({ children, maxH, overflowY, ...props }: any) => (
    <div data-testid='dialog-body' {...props}>
      {children}
    </div>
  ),
  DialogFooter: ({ children, ...props }: any) => (
    <div data-testid='dialog-footer' {...props}>
      {children}
    </div>
  )
}))

describe('ExploreFlashcards Component', () => {
  let flashcards: FlashcardType[]
  let mockMutation: any
  let mockQueryClient: any
  let mockNavigate: any

  beforeEach(() => {
    vi.clearAllMocks()

    flashcards = [
      {
        id: '1',
        question: 'Question 1',
        answer: 'Answer 1',
        subject: 'Subject 1'
      },
      {
        id: '2',
        question: 'Question 2',
        answer: 'Answer 2',
        subject: 'Subject 2'
      }
    ] as FlashcardType[]

    mockMutation = {
      mutate: vi.fn()
    }

    mockQueryClient = {
      setQueryData: vi.fn()
    }

    mockNavigate = vi.fn()

    let mutationOptions: any
    vi.mocked(useMutation).mockImplementation(options => {
      mutationOptions = options
      return mockMutation
    })
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient)
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    vi.mocked(createFlashcard).mockResolvedValue({
      id: '3',
      question: 'Question 3',
      answer: 'Answer 3',
      subject: 'Subject 3'
    } as FlashcardType)

    mockMutation.mutate.mockImplementation((data: unknown) => {
      mutationOptions.mutationFn(data).then((result: unknown) => {
        if (mutationOptions.onSuccess) {
          mutationOptions.onSuccess(result)
        }
      })
    })
  })

  it('renders flashcards in the table', () => {
    render(
      <ChakraProvider>
        <ExploreFlashcards flashcards={flashcards} />
      </ChakraProvider>
    )

    flashcards.forEach(flashcard => {
      expect(screen.getByText(flashcard.question)).toBeInTheDocument()
      expect(screen.getByText(flashcard.subject)).toBeInTheDocument()
    })

    const previewButtons = screen.getAllByRole('button', { name: /Preview/i })

    expect(previewButtons.length).toBe(flashcards.length)
  })

  it('opens dialog when Preview button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <ExploreFlashcards flashcards={flashcards} />
      </ChakraProvider>
    )

    const previewButton = screen.getAllByRole('button', { name: /Preview/i })[0]

    await user.click(previewButton)

    expect(screen.getByTestId('dialog-root')).toBeInTheDocument()
    expect(screen.getByText(flashcards[0].answer)).toBeInTheDocument()
  })

  it('closes dialog when Cancel button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <ExploreFlashcards flashcards={flashcards} />
      </ChakraProvider>
    )

    const previewButton = screen.getAllByRole('button', { name: /Preview/i })[0]

    await user.click(previewButton)

    expect(screen.getByTestId('dialog-root')).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })

    await user.click(cancelButton)

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-root')).not.toBeInTheDocument()
    })
  })

  it('calls mutation.mutate when Copiar button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <ExploreFlashcards flashcards={flashcards} />
      </ChakraProvider>
    )

    const previewButton = screen.getAllByRole('button', { name: /Preview/i })[0]

    await user.click(previewButton)

    const copiarButton = screen.getByRole('button', { name: /Copiar/i })

    await user.click(copiarButton)

    await waitFor(() => {
      expect(mockMutation.mutate).toHaveBeenCalledWith(flashcards[0])
    })
  })

  it('onSuccess updates cache and navigates to edit page', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <ExploreFlashcards flashcards={flashcards} />
      </ChakraProvider>
    )

    const previewButton = screen.getAllByRole('button', { name: /Preview/i })[0]

    await user.click(previewButton)

    const copiarButton = screen.getByRole('button', { name: /Copiar/i })

    await user.click(copiarButton)

    await waitFor(() => {
      expect(createFlashcard).toHaveBeenCalledWith(flashcards[0])
    })

    await waitFor(() => {
      expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(['flashcards', '3'], {
        id: '3',
        question: 'Question 3',
        answer: 'Answer 3',
        subject: 'Subject 3'
      })

      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/flashcards/edit/$flashcardId',
        params: { flashcardId: '3' }
      })
    })
  })

  it('renders correctly when there are no flashcards', () => {
    render(
      <ChakraProvider>
        <ExploreFlashcards flashcards={[]} />
      </ChakraProvider>
    )

    expect(screen.queryByText(/Question/)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Preview/i })).not.toBeInTheDocument()
  })
})
