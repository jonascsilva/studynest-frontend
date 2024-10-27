import { screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Route, Component } from '$/routes/(protected)/_protected/notes/new/index.lazy'
import { createNote, NoteType } from '$/query/notes'
import { renderWithContext } from '../../../../../customRender'
import { queryClient } from '$/lib/query'

vi.mock('$/query/notes')

it('Index component submits a new note and navigates on success', async () => {
  const user = userEvent.setup()

  vi.spyOn(queryClient, 'setQueryData')

  const noteMock = {
    id: '123',
    title: 'New Title',
    subject: 'New Subject',
    content: 'New Content'
  }

  vi.mocked(createNote).mockResolvedValue(noteMock as NoteType)

  const navigateMock = vi.fn()

  Route.useNavigate = vi.fn().mockReturnValue(navigateMock)

  renderWithContext(Component)

  const inputs = screen.getAllByRole('textbox')

  expect(inputs.length).toBe(3)

  const [titleInput, subjectInput, contentTextArea] = inputs

  await user.type(titleInput, 'New Title')
  await user.type(subjectInput, 'New Subject')
  await user.type(contentTextArea, 'New Content')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(createNote).toHaveBeenCalledWith({
    title: 'New Title',
    subject: 'New Subject',
    content: 'New Content'
  })

  expect(queryClient.setQueryData).toHaveBeenCalledWith(
    ['notes', { noteId: noteMock.id }],
    noteMock
  )

  expect(navigateMock).toHaveBeenCalledWith({
    to: '/notes/$noteId',
    params: { noteId: noteMock.id }
  })
})
