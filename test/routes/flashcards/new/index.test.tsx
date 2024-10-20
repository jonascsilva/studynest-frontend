import { screen } from '@testing-library/react'
import { expect, Mock, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Component } from '$/routes/flashcards/new/index.lazy'
import { createFlashcard } from '$/query/flashcards'
import { useNavigate } from '@tanstack/react-router'
import { renderWithContext } from '../../../customRender'
import { queryClient } from '$/lib/query'

vi.mock('$/query/flashcards', () => ({
  createFlashcard: vi.fn()
}))

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

it('Index component submits a new flashcard and navigates on success', async () => {
  const user = userEvent.setup()

  vi.spyOn(queryClient, 'setQueryData')

  const flashcardMock = {
    id: '123',
    question: 'New Question',
    subject: 'New Subject',
    answer: 'New Answer'
  }

  ;(createFlashcard as Mock).mockResolvedValue(flashcardMock)

  const navigateMock = vi.fn()

  ;(useNavigate as Mock).mockReturnValue(navigateMock)

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
    ['flashcards', { flashcardId: flashcardMock.id }],
    flashcardMock
  )

  expect(navigateMock).toHaveBeenCalledWith({
    to: '/flashcards/$flashcardId',
    params: { flashcardId: flashcardMock.id }
  })
})
