import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ShareFlashcardButton } from '$/components/ShareFlashcardButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FlashcardType } from '$/types'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import { updateFlashcard } from '$/query/flashcards'

vi.mock('@tanstack/react-query')

vi.mock('$/query/flashcards')

vi.mock('react-icons/bs', () => ({
  BsFillShareFill: () => <svg data-testid='bs-fill-share-fill-icon' />
}))

vi.mock('$/components/TableButton', () => ({
  TableButton: ({ children, colorPalette, ...props }: any) => (
    <button data-testid='table-button' {...props}>
      {children}
    </button>
  )
}))

describe('ShareFlashcardButton Component', () => {
  let mockMutation: any
  let mockQueryClient: any
  let mutationOptions: any

  beforeEach(() => {
    vi.clearAllMocks()

    mockMutation = {
      mutate: vi.fn(),
      isPending: false
    }

    mockQueryClient = {
      ensureQueryData: vi.fn(),
      setQueryData: vi.fn()
    }
    vi.mocked(useMutation).mockImplementation(options => {
      mutationOptions = options
      return mockMutation
    })
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient)

    const updateFlashcardMock: any = (id: string) => {
      return (variables: Partial<FlashcardType>) => {
        return Promise.resolve({
          id,
          question: 'Question 1',
          answer: 'Answer 1',
          subject: 'Subject 1',
          shared: variables.shared
        })
      }
    }

    vi.mocked(updateFlashcard).mockImplementation(updateFlashcardMock)
  })

  it('renders TableButton with correct props when not shared and not pending', () => {
    render(
      <ChakraProvider>
        <ShareFlashcardButton shared={false} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('variant', 'outline')
    expect(button).not.toBeDisabled()
    expect(screen.getByTestId('bs-fill-share-fill-icon')).toBeInTheDocument()
  })

  it('renders TableButton with correct props when shared and not pending', () => {
    render(
      <ChakraProvider>
        <ShareFlashcardButton shared={true} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('variant', 'solid')
    expect(button).not.toBeDisabled()
    expect(screen.getByTestId('bs-fill-share-fill-icon')).toBeInTheDocument()
  })

  it('renders Spinner when mutation is pending', () => {
    mockMutation.isPending = true

    render(
      <ChakraProvider>
        <ShareFlashcardButton shared={false} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('variant', 'outline')
    expect(button).toBeDisabled()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('calls mutate with correct arguments when clicked', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <ShareFlashcardButton shared={false} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')

    await user.click(button)

    expect(mockMutation.mutate).toHaveBeenCalledWith({ shared: true })
  })

  it('updates cache and sets correct data on mutation success', async () => {
    const flashcards = [
      {
        id: '1',
        shared: false,
        question: 'Question 1',
        answer: 'Answer 1',
        subject: 'Subject 1'
      },
      {
        id: '2',
        shared: true,
        question: 'Question 2',
        answer: 'Answer 2',
        subject: 'Subject 2'
      }
    ] as FlashcardType[]

    mockQueryClient.ensureQueryData.mockResolvedValue(flashcards)

    mockMutation.mutate.mockImplementation((variables: unknown) => {
      mutationOptions.mutationFn(variables).then((result: FlashcardType) => {
        mutationOptions.onSuccess(result)
      })
    })

    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <ShareFlashcardButton shared={false} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')

    await user.click(button)

    expect(updateFlashcard).toHaveBeenCalledWith('1')

    expect(mockQueryClient.ensureQueryData).toHaveBeenCalledWith({
      queryKey: ['flashcards', { due: true, upcoming: true }]
    })

    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
      ['flashcards', { due: true, upcoming: true }],
      [
        {
          id: '1',
          shared: true,
          question: 'Question 1',
          answer: 'Answer 1',
          subject: 'Subject 1'
        },
        {
          id: '2',
          shared: true,
          question: 'Question 2',
          answer: 'Answer 2',
          subject: 'Subject 2'
        }
      ]
    )
  })
})
