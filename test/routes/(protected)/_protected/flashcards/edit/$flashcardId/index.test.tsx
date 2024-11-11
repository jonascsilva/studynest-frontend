import { screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Route, Component } from '$/routes/(protected)/_protected/flashcards/edit/$flashcardId'
import { updateFlashcard } from '$/query/flashcards'
import { queryClient } from '$/lib/query'
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

it('should fetch and render flashcard data, and update flashcard on form submit', async () => {
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

  const mutationFnMock = vi.fn().mockResolvedValue({
    ...flashcardMock,
    question: 'Updated Question',
    subject: 'Updated Subject',
    answer: 'Updated Answer'
  })

  vi.mocked(updateFlashcard).mockReturnValue(mutationFnMock)

  vi.spyOn(queryClient, 'setQueryData')

  renderWithContext(Component)

  expect(screen.getByDisplayValue('Original Question')).toBeInTheDocument()

  const questionInput = screen.getByDisplayValue('Original Question')
  const subjectInput = screen.getByDisplayValue('Original Subject')
  const answerInput = screen.getByDisplayValue('Original Answer')

  await user.clear(questionInput)
  await user.type(questionInput, 'Updated Question')

  await user.clear(subjectInput)
  await user.type(subjectInput, 'Updated Subject')

  await user.clear(answerInput)
  await user.type(answerInput, 'Updated Answer')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(updateFlashcard).toHaveBeenCalledWith(flashcardMockId)

  expect(mutationFnMock).toHaveBeenCalledWith({
    question: 'Updated Question',
    subject: 'Updated Subject',
    answer: 'Updated Answer'
  })

  expect(queryClient.setQueryData).toHaveBeenCalledWith(['flashcards', flashcardMockId], {
    id: flashcardMockId,
    question: 'Updated Question',
    subject: 'Updated Subject',
    answer: 'Updated Answer'
  })
})
