import { screen } from '@testing-library/react'
import { expect, it, vi, Mock } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Component } from '$/routes/(protected)/_protected/flashcards/$flashcardId'
import { updateFlashcard } from '$/query/flashcards'
import { useParams } from '@tanstack/react-router'
import { queryClient } from '$/lib/query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { renderWithContext } from '../../../../../customRender'

vi.mock('$/query/flashcards', () => ({
  updateFlashcard: vi.fn()
}))

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useParams: vi.fn()
  }
})

it('Index component fetches and renders flashcard data, and updates flashcard on form submit', async () => {
  const user = userEvent.setup()

  const flashcardMockId = '123'

  ;(useParams as Mock).mockReturnValue({ flashcardId: flashcardMockId })

  const flashcardMock = {
    id: flashcardMockId,
    question: 'Original Question',
    subject: 'Original Subject',
    answer: 'Original Answer'
  }

  ;(useSuspenseQuery as Mock).mockReturnValue({
    data: flashcardMock
  })

  const mutationFnMock = vi.fn().mockResolvedValue({
    ...flashcardMock,
    question: 'Updated Question',
    subject: 'Updated Subject',
    answer: 'Updated Answer'
  })

  ;(updateFlashcard as Mock).mockReturnValue(mutationFnMock)

  vi.spyOn(queryClient, 'setQueryData')

  renderWithContext(Component)

  expect(screen.getByDisplayValue('Original Question')).toBeInTheDocument()

  const questionInput = screen.getByDisplayValue('Original Question') as HTMLInputElement
  const subjectInput = screen.getByDisplayValue('Original Subject') as HTMLInputElement
  const answerInput = screen.getByDisplayValue('Original Answer') as HTMLTextAreaElement

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

  expect(queryClient.setQueryData).toHaveBeenCalledWith(
    ['flashcards', { flashcardId: flashcardMockId }],
    {
      id: flashcardMockId,
      question: 'Updated Question',
      subject: 'Updated Subject',
      answer: 'Updated Answer'
    }
  )
})
