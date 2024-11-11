import { screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Route, Component } from '$/routes/(protected)/_protected/flashcards/new/index.lazy'
import { createFlashcard } from '$/query/flashcards'
import { renderWithContext } from '../../../../../customRender'
import { queryClient } from '$/lib/query'
import { FlashcardType } from '$/types'

vi.mock('$/query/flashcards')

it('should submit a new flashcard and navigate on success', async () => {
  const user = userEvent.setup()

  vi.spyOn(queryClient, 'setQueryData')

  const flashcardMock = {
    id: '123',
    question: 'New Question',
    subject: 'New Subject',
    answer: 'New Answer'
  }

  vi.mocked(createFlashcard).mockResolvedValue(flashcardMock as FlashcardType)

  const navigateMock = vi.fn()

  Route.useNavigate = vi.fn().mockReturnValue(navigateMock)

  renderWithContext(Component)

  const inputs = screen.getAllByRole('textbox')

  expect(inputs.length).toBe(3)

  const [questionInput, subjectInput, answerTextArea] = inputs

  await user.type(questionInput, 'New Question')
  await user.type(subjectInput, 'New Subject')
  await user.type(answerTextArea, 'New Answer')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(createFlashcard).toHaveBeenCalledWith({
    question: 'New Question',
    subject: 'New Subject',
    answer: 'New Answer'
  })

  expect(queryClient.setQueryData).toHaveBeenCalledWith(
    ['flashcards', flashcardMock.id],
    flashcardMock
  )

  expect(navigateMock).toHaveBeenCalledWith({
    to: '/flashcards/edit/$flashcardId',
    params: { flashcardId: flashcardMock.id }
  })
})
