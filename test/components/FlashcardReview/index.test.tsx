import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FlashcardReview } from '$/components/FlashcardReview'
import { useNavigate } from '@tanstack/react-router'
import { UseMutationResult } from '@tanstack/react-query'
import { FlashcardType, FlashcardWithRevisionType, ReviewResult } from '$/types'
import { renderWithContext } from '../../customRender'
import userEvent from '@testing-library/user-event'
import { queryClient } from '$/lib/query'

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

describe('FlashcardReview Component', () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  const flashcard = {
    id: 'fake-flashcard-id',
    question: 'What is React?',
    answer: 'A JavaScript library for building user interfaces'
  } as FlashcardType

  it('should render flashcard question', () => {
    renderWithContext(() => <FlashcardReview flashcard={flashcard} />)

    expect(screen.getByText(flashcard.question)).toBeInTheDocument()
  })

  it('should not show answer initially', () => {
    renderWithContext(() => <FlashcardReview flashcard={flashcard} />)

    expect(screen.getByText('Revelar')).toBeInTheDocument()
  })

  it('should show answer after clicking "Revelar"', async () => {
    const user = userEvent.setup()

    renderWithContext(() => <FlashcardReview flashcard={flashcard} />)

    await user.click(screen.getByText('Revelar'))

    expect(screen.getByText(flashcard.answer)).toBeInTheDocument()
    expect(screen.queryByText('Revelar')).not.toBeInTheDocument()
  })

  it('should show result buttons after revealing the answer', async () => {
    const user = userEvent.setup()

    renderWithContext(() => <FlashcardReview flashcard={flashcard} />)

    await user.click(screen.getByText('Revelar'))

    expect(screen.getByText('Não lembrei')).toBeInTheDocument()
    expect(screen.getByText('Lembrei')).toBeInTheDocument()
  })

  it('should call handleResult with 0 when "Não lembrei" is clicked and mutation is provided', async () => {
    const user = userEvent.setup()

    const mutateAsync = vi.fn().mockResolvedValue({ nextReviewDate: new Date() })
    const mutation = {
      mutateAsync,
      isPending: false
    } as any

    renderWithContext(() => <FlashcardReview flashcard={flashcard} mutation={mutation} />)

    await user.click(screen.getByText('Revelar'))

    await user.click(screen.getByText('Não lembrei'))

    expect(mutateAsync).toHaveBeenCalledWith({ result: 0 })
  })

  it('should call handleResult with 1 when "Lembrei" is clicked and mutation is provided', async () => {
    const user = userEvent.setup()

    const mutateAsync = vi.fn().mockResolvedValue({ nextReviewDate: new Date() })
    const mutation = {
      mutateAsync,
      isPending: false
    } as any

    renderWithContext(() => <FlashcardReview flashcard={flashcard} mutation={mutation} />)

    await user.click(screen.getByText('Revelar'))

    await user.click(screen.getByText('Lembrei'))

    expect(mutateAsync).toHaveBeenCalledWith({ result: 1 })
  })

  it('should navigate to "/flashcards" when handleResult is called without mutation', async () => {
    const user = userEvent.setup()

    renderWithContext(() => <FlashcardReview flashcard={flashcard} />)

    await user.click(screen.getByText('Revelar'))

    await user.click(screen.getByText('Lembrei'))

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/flashcards' })
  })

  it('should navigate to next flashcard when there is one', async () => {
    const user = userEvent.setup()

    const mutateAsync = vi.fn().mockResolvedValue({ nextReviewDate: new Date() })
    const mutation = {
      mutateAsync,
      isPending: false
    } as any

    const flashcardsMock = [{ id: 'flashcard-id-1' }, { id: 'flashcard-id-2' }]

    const ensureQueryDataMock = vi.fn().mockResolvedValue(flashcardsMock)

    queryClient.ensureQueryData = ensureQueryDataMock

    renderWithContext(() => <FlashcardReview flashcard={flashcard} mutation={mutation} />)

    await user.click(screen.getByText('Revelar'))

    await user.click(screen.getByText('Lembrei'))

    expect(await screen.findByTestId('dialog-content')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ok' }))

    expect(await screen.findByText('Revelar')).toBeInTheDocument()
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/flashcards/review/$flashcardId',
      params: { flashcardId: 'flashcard-id-1' },
      replace: true
    })
  })

  it('should navigate to home when there is no next flashcard', async () => {
    const user = userEvent.setup()

    const mutateAsync = vi.fn().mockResolvedValue({ nextReviewDate: new Date() })
    const mutation = {
      mutateAsync,
      isPending: false
    } as any

    const ensureQueryDataMock = vi.fn().mockResolvedValue([])

    queryClient.ensureQueryData = ensureQueryDataMock

    renderWithContext(() => <FlashcardReview flashcard={flashcard} mutation={mutation} />)

    await user.click(screen.getByText('Revelar'))

    await user.click(screen.getByText('Lembrei'))

    expect(await screen.findByTestId('dialog-content')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ok' }))

    expect(await screen.findByText('Revelar')).toBeInTheDocument()
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/home', replace: true })
  })

  it('should show Alert when in preview mode (no mutation provided)', () => {
    renderWithContext(() => <FlashcardReview flashcard={flashcard} />)

    expect(
      screen.getByText('Você está no modo Preview. O resultado desta revisão não será salvo!')
    ).toBeInTheDocument()
  })

  it('should not show Alert when mutation is provided', () => {
    const mutation = {} as UseMutationResult<
      FlashcardWithRevisionType,
      Error,
      ReviewResult,
      unknown
    >

    renderWithContext(() => <FlashcardReview flashcard={flashcard} mutation={mutation} />)

    expect(
      screen.queryByText('Você está no modo Preview. O resultado desta revisão não será salvo!')
    ).not.toBeInTheDocument()
  })

  it('should disable buttons when mutation is pending', async () => {
    const user = userEvent.setup()

    const mutateAsync = vi.fn()
    const mutation = {
      mutateAsync,
      isPending: true
    } as any

    renderWithContext(() => <FlashcardReview flashcard={flashcard} mutation={mutation} />)

    await user.click(screen.getByText('Revelar'))

    const button1 = screen.getByText('Não lembrei')
    const button2 = screen.getByText('Lembrei')

    expect(button1.parentElement).toHaveAttribute('disabled')
    expect(button2.parentElement).toHaveAttribute('disabled')
  })
})
