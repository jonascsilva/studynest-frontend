import { expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithContext } from '../../customRender'
import { Note } from '$/cmps/Note'
import userEvent from '@testing-library/user-event'

it('Note renders correctly with provided note data', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: false
  }

  const mockNote: any = {
    title: 'Test Title',
    subject: 'Test Subject',
    content: 'Test Content'
  }

  renderWithContext(() => <Note mutation={mutationMock} note={mockNote} />)

  expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Test Subject')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument()
})

it('Note submit calls mutation.mutate with form data', async () => {
  const user = userEvent.setup()

  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: false
  }

  renderWithContext(() => <Note mutation={mutationMock} />)

  const inputs = screen.getAllByRole('textbox')

  expect(inputs.length).toBe(3)

  const [titleInput, subjectInput, contentTextArea] = inputs

  await user.type(titleInput, 'New Title')
  await user.type(subjectInput, 'New Subject')
  await user.type(contentTextArea, 'New Content')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(mutationMock.mutate).toHaveBeenCalled()
  expect(mutationMock.mutate).toHaveBeenCalledWith({
    title: 'New Title',
    subject: 'New Subject',
    content: 'New Content'
  })
})

it('Submit and Back buttons are disabled when mutation is pending', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: true
  }

  renderWithContext(() => <Note mutation={mutationMock} />)

  const submitButton = screen.getByRole('button', { name: /Salvar/i })
  const backButton = screen.getByRole('button', { name: /Voltar/i })

  expect(submitButton).toBeDisabled()
  expect(backButton).toBeDisabled()
})

it('Submit button shows loading state when mutation is pending', () => {
  const mutationMock: any = {
    mutate: vi.fn(),
    isPending: true
  }

  renderWithContext(() => <Note mutation={mutationMock} />)

  expect(screen.getByText('Loading...')).toBeInTheDocument()
})
