import { screen } from '@testing-library/react'
import {
  RouteComponent,
  Route
} from '$/routes/(protected)/_protected/(dashboard)/_dashboard/explore'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { renderWithContext } from '../../../../../customRender'
import userEvent from '@testing-library/user-event'

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

vi.mock('react-hook-form', () => ({
  useForm: vi.fn()
}))

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    createFileRoute: vi.fn(() => () => ({
      useSearch: vi.fn(),
      useNavigate: vi.fn()
    })) as any,
    Link: ({ children, to }: any) => (
      <a href={to} data-testid='link'>
        {children}
      </a>
    )
  }
})

vi.mock('$/components/ExploreFlashcards', () => ({
  ExploreFlashcards: ({ flashcards }: any) => (
    <div data-testid='explore-flashcards'>
      {flashcards.map((card: any, index: number) => (
        <div key={index} data-testid='flashcard-item'>
          {card.content}
        </div>
      ))}
    </div>
  )
}))

vi.mock('$/components/ExploreNotes', () => ({
  ExploreNotes: ({ notes }: any) => (
    <div data-testid='explore-notes'>
      {notes.map((note: any, index: number) => (
        <div key={index} data-testid='note-item'>
          {note.content}
        </div>
      ))}
    </div>
  )
}))

vi.mock('react-icons/bs', () => ({
  BsCardText: () => <svg data-testid='bs-card-text-icon' />,
  BsFileEarmarkText: () => <svg data-testid='bs-file-earmark-text-icon' />,
  BsSearch: () => <svg data-testid='bs-search-icon' />
}))

describe('RouteComponent', () => {
  let useSearchMock: Mock
  let useNavigateMock: Mock
  let useFormMock: Mock

  beforeEach(() => {
    vi.clearAllMocks()

    useSearchMock = vi.fn()
    useNavigateMock = vi.fn()
    useFormMock = vi.fn()

    Route.useSearch = useSearchMock
    Route.useNavigate = useNavigateMock

    vi.mocked(useForm).mockImplementation(useFormMock)
  })

  it('renders correctly with initial state', () => {
    const query = ''
    const flashcardsData = [{ content: 'Flashcard 1' }, { content: 'Flashcard 2' }]
    const notesData = [{ content: 'Note 1' }, { content: 'Note 2' }]

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(vi.fn())
    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: flashcardsData } as any)
      .mockReturnValueOnce({ data: notesData } as any)
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: (fn: any) => fn,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    expect(screen.getByRole('heading', { name: 'Flashcards' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('O que deseja pesquisar?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Pesquisar/i })).toBeInTheDocument()
    expect(screen.getByTestId('explore-flashcards')).toBeInTheDocument()
    expect(screen.queryByTestId('explore-notes')).not.toBeInTheDocument()
  })

  it('submits the form and navigates with the correct data', async () => {
    const query = ''
    const navigateMock = vi.fn()
    const flashcardsData: any[] = []
    const notesData: any[] = []

    const user = userEvent.setup()

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(navigateMock)
    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: flashcardsData } as any)
      .mockReturnValueOnce({ data: notesData } as any)
    const handleSubmitMock = vi.fn((fn: any) => (e: any) => {
      e.preventDefault()

      fn({ query: 'test query' })
    })

    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: handleSubmitMock,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    const input = screen.getByPlaceholderText('O que deseja pesquisar?')

    await user.type(input, 'test query')

    const button = screen.getByRole('button', { name: /Pesquisar/i })

    await user.click(button)

    expect(navigateMock).toHaveBeenCalledWith({
      to: '.',
      search: { query: 'test query' }
    })
  })

  it('switches tabs and displays correct content', async () => {
    const query = ''
    const flashcardsData = [{ content: 'Flashcard 1' }, { content: 'Flashcard 2' }]
    const notesData = [{ content: 'Note 1' }, { content: 'Note 2' }]

    const user = userEvent.setup()

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(vi.fn())
    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: flashcardsData } as any)
      .mockReturnValueOnce({ data: notesData } as any)
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: (fn: any) => fn,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    expect(screen.getByTestId('explore-flashcards')).toBeInTheDocument()
    expect(screen.queryByTestId('explore-notes')).not.toBeInTheDocument()

    const notesTab = screen.getByRole('tab', { name: /Anotações/i })

    await user.click(notesTab)

    expect(screen.getByTestId('explore-notes')).toBeInTheDocument()
    expect(screen.queryByTestId('explore-flashcards')).not.toBeInTheDocument()
  })

  it('displays the correct data based on the query parameter', () => {
    const query = 'search term'
    const flashcardsData = [{ content: 'Flashcard matching search term' }]
    const notesData = [{ content: 'Note matching search term' }]

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(vi.fn())
    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: flashcardsData } as any)
      .mockReturnValueOnce({ data: notesData } as any)
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: (fn: any) => fn,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    expect(screen.getByText('Flashcard matching search term')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    const query = ''
    const flashcardsData: any[] = []
    const notesData: any[] = []

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(vi.fn())
    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: flashcardsData } as any)
      .mockReturnValueOnce({ data: notesData } as any)
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: (fn: any) => fn,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    expect(screen.getByTestId('explore-flashcards')).toBeInTheDocument()
    expect(screen.queryByTestId('flashcard-item')).not.toBeInTheDocument()
  })

  it('handles form submission with empty query', async () => {
    const query = ''
    const navigateMock = vi.fn()

    const user = userEvent.setup()

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(navigateMock)
    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: [] } as any)
      .mockReturnValueOnce({ data: [] } as any)
    const handleSubmitMock = vi.fn((fn: any) => (e: any) => {
      e.preventDefault()

      fn({ query: '' })
    })

    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: handleSubmitMock,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    const button = screen.getByRole('button', { name: /Pesquisar/i })

    await user.click(button)

    expect(navigateMock).toHaveBeenCalledWith({
      to: '.',
      search: { query: '' }
    })
  })

  it('registers the input field correctly', () => {
    const query = ''
    const registerMock = vi.fn()

    useSearchMock.mockReturnValue({ query })
    useNavigateMock.mockReturnValue(vi.fn())

    vi.mocked(useSuspenseQuery)
      .mockReturnValueOnce({ data: [] } as any)
      .mockReturnValueOnce({ data: [] } as any)
    useFormMock.mockReturnValue({
      register: registerMock,
      handleSubmit: (fn: any) => fn,
      getValues: vi.fn(),
      setValue: vi.fn()
    })

    renderWithContext(() => <RouteComponent />)

    expect(registerMock).toHaveBeenCalledWith('query')
  })
})
