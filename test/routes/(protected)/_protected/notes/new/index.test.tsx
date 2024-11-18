import { screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Route, Component } from '$/routes/(protected)/_protected/notes/new/index.lazy'
import { createNote } from '$/query/notes'
import { renderWithContext } from '../../../../../customRender'
import { queryClient } from '$/lib/query'
import { NoteType } from '$/types'

vi.mock('$/query/notes')

it('should submit a new note and navigate on success', async () => {
  const user = userEvent.setup()

  vi.spyOn(queryClient, 'setQueryData')

  const noteMock = {
    id: '123',
    subject: 'New Subject',
    title: 'New Title',
    content: 'New Content'
  }

  vi.mocked(createNote).mockResolvedValue(noteMock as NoteType)

  const navigateMock = vi.fn()

  Route.useNavigate = vi.fn().mockReturnValue(navigateMock)

  renderWithContext(Component)

  const inputs = screen.getAllByRole('textbox')

  expect(inputs.length).toBe(3)

  const [subjectInput, titleInput, contentTextArea] = inputs

  await user.type(subjectInput, 'New Subject')
  await user.type(titleInput, 'New Title')
  await user.type(contentTextArea, 'New Content')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(createNote).toHaveBeenCalledWith({
    subject: 'New Subject',
    title: 'New Title',
    content: 'New Content'
  })

  expect(queryClient.setQueryData).toHaveBeenCalledWith(['notes', noteMock.id], noteMock)

  expect(navigateMock).toHaveBeenCalledWith({
    to: '/notes/edit/$noteId',
    params: { noteId: noteMock.id }
  })
})
