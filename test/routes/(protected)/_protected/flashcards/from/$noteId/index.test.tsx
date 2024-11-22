import { screen } from '@testing-library/react'
import {
  Route,
  RouteComponent
} from '$/routes/(protected)/_protected/flashcards/from/$noteId/index'
import { describe, it, expect, vi } from 'vitest'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { renderWithContext } from '../../../../../../customRender'
import userEvent from '@testing-library/user-event'

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useMutation: vi.fn(),
    useSuspenseQuery: vi.fn()
  }
})

vi.mock('$/query/flashcards')

vi.mock('$/query/notesOptions')

vi.mock('$/components/ui/close-button', () => ({
  CloseButton: ({ ...props }: any) => <button {...props}>Close</button>
}))

vi.mock('$/components/GeneratedFlashcard', () => ({
  GeneratedFlashcard: ({ flashcard }: any) => (
    <div data-testid='generated-flashcard'>
      <p>{flashcard.question}</p>
      <p>{flashcard.answer}</p>
    </div>
  )
}))

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    Link: ({ children, to }: any) => <a href={to}>{children}</a>
  }
})

vi.mock('react-icons/bs', () => ({
  BsStars: () => <svg data-testid='bs-stars-icon' />
}))

describe('RouteComponent', () => {
  it('should render note title and generate button', () => {
    const noteId = '1'
    const note = { id: noteId, title: 'Test Note' }

    vi.spyOn(Route, 'useParams').mockReturnValue({ noteId })

    vi.mocked(useSuspenseQuery).mockReturnValue({ data: note } as any)

    const mutateMock = vi.fn()
    vi.mocked(useMutation).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isSuccess: false,
      data: null
    } as any)

    renderWithContext(() => <RouteComponent />)

    expect(screen.getByText('Gerar flashcards')).toBeInTheDocument()
    expect(
      screen.getByText(/Deseja gerar flashcards com base no conteúdo da anotação:/i)
    ).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /Gerar/i })

    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('should call generateMutation.mutate with note.id when generate button is clicked', async () => {
    const noteId = '1'
    const note = { id: noteId, title: 'Test Note' }

    vi.spyOn(Route, 'useParams').mockReturnValue({ noteId })

    vi.mocked(useSuspenseQuery).mockReturnValue({ data: note } as any)

    const mutateMock = vi.fn()
    vi.mocked(useMutation).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isSuccess: false,
      data: null
    } as any)

    const user = userEvent.setup()

    renderWithContext(() => <RouteComponent />)

    const button = screen.getByRole('button', { name: /Gerar/i })

    await user.click(button)

    expect(mutateMock).toHaveBeenCalledWith(note.id)
  })

  it('should show loading state when generateMutation is pending', () => {
    const noteId = '1'
    const note = { id: noteId, title: 'Test Note' }

    vi.spyOn(Route, 'useParams').mockReturnValue({ noteId })

    vi.mocked(useSuspenseQuery).mockReturnValue({ data: note } as any)

    const mutateMock = vi.fn()
    vi.mocked(useMutation).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      isSuccess: false,
      data: null
    } as any)

    renderWithContext(() => <RouteComponent />)

    const button = screen.getByRole('button', { name: /Gerar/i })
    const spinner = screen.getByTestId('spinner')

    expect(button).toBeInTheDocument()
    expect(spinner).toBeInTheDocument()
    expect(button).toHaveProperty('disabled', true)
  })

  it('should render generated flashcards when mutation is successful', () => {
    const noteId = '1'
    const note = { id: noteId, title: 'Test Note' }

    const generatedFlashcards = [
      { question: 'Question 1', answer: 'Answer 1' },
      { question: 'Question 2', answer: 'Answer 2' }
    ]

    vi.spyOn(Route, 'useParams').mockReturnValue({ noteId })

    vi.mocked(useSuspenseQuery).mockReturnValue({ data: note } as any)

    const mutateMock = vi.fn()
    vi.mocked(useMutation).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isSuccess: true,
      data: generatedFlashcards
    } as any)

    renderWithContext(() => <RouteComponent />)

    const flashcards = screen.getAllByTestId('generated-flashcard')

    expect(flashcards).toHaveLength(2)
    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Answer 1')).toBeInTheDocument()
    expect(screen.getByText('Question 2')).toBeInTheDocument()
    expect(screen.getByText('Answer 2')).toBeInTheDocument()
  })

  it('should disable CloseButton when mutation is pending', () => {
    const noteId = '1'
    const note = { id: noteId, title: 'Test Note' }

    vi.spyOn(Route, 'useParams').mockReturnValue({ noteId })

    vi.mocked(useSuspenseQuery).mockReturnValue({ data: note } as any)

    const mutateMock = vi.fn()
    vi.mocked(useMutation).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      isSuccess: false,
      data: null
    } as any)

    renderWithContext(() => <RouteComponent />)

    const closeButton = screen.getByRole('button', { name: /Close/i })

    expect(closeButton).toBeDisabled()
  })
})
