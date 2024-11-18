import { expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithContext } from '../../customRender'
import { Note } from '$/components/Note'
import userEvent from '@testing-library/user-event'

it('should render correctly with provided note data', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: false
  }

  const mockNote: any = {
    subject: 'Test Subject',
    title: 'Test Title',
    content: 'Test Content'
  }

  renderWithContext(() => <Note mutation={mutationMock} note={mockNote} />)

  expect(screen.getByDisplayValue('Test Subject')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument()
})

it('should call mutation.mutate with form data', async () => {
  const user = userEvent.setup()

  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: false
  }

  renderWithContext(() => <Note mutation={mutationMock} />)

  const inputs = screen.getAllByRole('textbox')

  expect(inputs.length).toBe(3)

  const [subjectInput, titleInput, contentTextArea] = inputs

  await user.type(subjectInput, 'New Subject')
  await user.type(titleInput, 'New Title')
  await user.type(contentTextArea, 'New Content')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(mutationMock.mutate).toHaveBeenCalled()
  expect(mutationMock.mutate).toHaveBeenCalledWith({
    subject: 'New Subject',
    title: 'New Title',
    content: 'New Content'
  })
})

it('should disable Submit and Back buttons when mutation is pending', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: true
  }

  renderWithContext(() => <Note mutation={mutationMock} />)

  const submitButton = screen.getByRole('button', { name: /Salvar/i })
  const backButton = screen.getByTestId('close-button')

  expect(submitButton).toBeDisabled()
  expect(backButton).toBeDisabled()
})
