import { screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Route, Component } from '$/routes/(protected)/_protected/flashcards/review/$flashcardId'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { renderWithContext } from '../../../../../../customRender'

vi.mock('$/query/flashcards')

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

it('should render the flashcard question, and answer on click', async () => {
  const user = userEvent.setup()

  const flashcardMockId = '123'

  Route.useParams = vi.fn().mockReturnValue({ flashcardId: flashcardMockId })

  const flashcardMock = {
    id: flashcardMockId,
    question: 'Original Question',
    subject: 'Original Subject',
    answer: 'Original Answer'
  }

  vi.mocked(useSuspenseQuery).mockReturnValue({
    data: flashcardMock
  } as UseSuspenseQueryResult<unknown, unknown>)

  renderWithContext(Component)

  expect(screen.getByText('Original Question')).toBeInTheDocument()

  const revealButton = screen.getByRole('button', { name: /revelar/i })

  expect(revealButton).toBeInTheDocument()

  await user.click(revealButton)

  expect(screen.getByText('Original Answer')).toBeInTheDocument()
})
