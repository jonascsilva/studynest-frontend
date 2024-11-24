import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ShareNoteButton } from '$/components/ShareNoteButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NoteType } from '$/types'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import { updateNote } from '$/query/notes'

vi.mock('@tanstack/react-query')

vi.mock('$/query/notes')

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

describe('ShareNoteButton Component', () => {
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

    const updateNoteMock: any = (id: string) => {
      return (variables: Partial<NoteType>) => {
        return Promise.resolve({
          id,
          title: 'Title 1',
          content: 'Content 1',
          subject: 'Subject 1',
          shared: variables.shared
        })
      }
    }

    vi.mocked(updateNote).mockImplementation(updateNoteMock)
  })

  it('renders TableButton with correct props when not shared and not pending', () => {
    render(
      <ChakraProvider>
        <ShareNoteButton shared={false} id='1' />
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
        <ShareNoteButton shared={true} id='1' />
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
        <ShareNoteButton shared={false} id='1' />
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
        <ShareNoteButton shared={false} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')
    await user.click(button)

    expect(mockMutation.mutate).toHaveBeenCalledWith({ shared: true })
  })

  it('updates cache and sets correct data on mutation success', async () => {
    const notes = [
      {
        id: '1',
        shared: false,
        title: 'Title 1',
        content: 'Content 1',
        subject: 'Subject 1'
      },
      {
        id: '2',
        shared: true,
        title: 'Title 2',
        content: 'Content 2',
        subject: 'Subject 2'
      }
    ] as NoteType[]

    mockQueryClient.ensureQueryData.mockResolvedValue(notes)

    mockMutation.mutate.mockImplementation((variables: unknown) => {
      mutationOptions.mutationFn(variables).then((result: NoteType) => {
        mutationOptions.onSuccess(result)
      })
    })

    const user = userEvent.setup()
    render(
      <ChakraProvider>
        <ShareNoteButton shared={false} id='1' />
      </ChakraProvider>
    )

    const button = screen.getByTestId('table-button')

    await user.click(button)

    expect(updateNote).toHaveBeenCalledWith('1')

    expect(mockQueryClient.ensureQueryData).toHaveBeenCalledWith({
      queryKey: ['notes']
    })

    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
      ['notes'],
      [
        {
          id: '1',
          shared: true,
          title: 'Title 1',
          content: 'Content 1',
          subject: 'Subject 1'
        },
        {
          id: '2',
          shared: true,
          title: 'Title 2',
          content: 'Content 2',
          subject: 'Subject 2'
        }
      ]
    )
  })
})
