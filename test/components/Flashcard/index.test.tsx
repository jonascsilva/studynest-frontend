import { expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithContext } from '../../customRender'
import { Flashcard } from '$/components/Flashcard'
import userEvent from '@testing-library/user-event'

it('should render correctly with provided note data', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: false
  }

  const mockFlashcard: any = {
    question: 'Test Question',
    subject: 'Test Subject',
    answer: 'Test Answer'
  }

  renderWithContext(() => <Flashcard mutation={mutationMock} flashcard={mockFlashcard} />)

  expect(screen.getByDisplayValue('Test Question')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Test Subject')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Test Answer')).toBeInTheDocument()
})

it('should call mutation.mutate with form data', async () => {
  const user = userEvent.setup()

  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: false
  }

  renderWithContext(() => <Flashcard mutation={mutationMock} />)

  const inputs = screen.getAllByRole('textbox')

  expect(inputs.length).toBe(3)

  const [questionInput, subjectInput, answerTextArea] = inputs

  await user.type(questionInput, 'New Question')
  await user.type(subjectInput, 'New Subject')
  await user.type(answerTextArea, 'New Answer')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(mutationMock.mutate).toHaveBeenCalled()
  expect(mutationMock.mutate).toHaveBeenCalledWith({
    question: 'New Question',
    subject: 'New Subject',
    answer: 'New Answer'
  })
})

it('should disable Submit and Back buttons when mutation is pending', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: true
  }

  renderWithContext(() => <Flashcard mutation={mutationMock} />)

  const submitButton = screen.getByRole('button', { name: /Salvar/i })
  const backButton = screen.getByRole('button', { name: /Voltar/i })

  expect(submitButton).toBeDisabled()
  expect(backButton).toBeDisabled()
})
