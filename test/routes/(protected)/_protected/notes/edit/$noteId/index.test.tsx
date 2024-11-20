import { screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Route, Component } from '$/routes/(protected)/_protected/notes/edit/$noteId'
import { updateNote } from '$/query/notes'
import { queryClient } from '$/lib/query'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { renderWithContext } from '../../../../../../customRender'

vi.mock('$/query/notes')

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

it('should fetch and render note data, and update note on form submit', async () => {
  const user = userEvent.setup()

  const noteMockId = '123'

  Route.useParams = vi.fn().mockReturnValue({ noteId: noteMockId })

  const noteMock = {
    id: noteMockId,
    title: 'Original Title',
    subject: 'Original Subject',
    content: 'Original Content'
  }

  vi.mocked(useSuspenseQuery).mockReturnValue({
    data: noteMock
  } as UseSuspenseQueryResult<unknown, unknown>)

  const mutationFnMock = vi.fn().mockResolvedValue({
    ...noteMock,
    title: 'Updated Title',
    subject: 'Updated Subject',
    content: 'Updated Content'
  })

  vi.mocked(updateNote).mockReturnValue(mutationFnMock)

  vi.spyOn(queryClient, 'setQueryData')

  renderWithContext(Component)

  expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument()

  const titleInput = screen.getByDisplayValue('Original Title') as HTMLInputElement
  const subjectInput = screen.getByDisplayValue('Original Subject') as HTMLInputElement
  const contentInput = screen.getByDisplayValue('Original Content') as HTMLTextAreaElement

  await user.clear(titleInput)
  await user.type(titleInput, 'Updated Title')

  await user.clear(subjectInput)
  await user.type(subjectInput, 'Updated Subject')

  await user.clear(contentInput)
  await user.type(contentInput, 'Updated Content')

  const submitButton = screen.getByRole('button', { name: /Salvar/i })

  await user.click(submitButton)

  expect(updateNote).toHaveBeenCalledWith(noteMockId)

  expect(mutationFnMock).toHaveBeenCalledWith({
    title: 'Updated Title',
    subject: 'Updated Subject',
    content: 'Updated Content'
  })

  expect(queryClient.setQueryData).toHaveBeenCalledWith(['notes', noteMockId], {
    id: noteMockId,
    title: 'Updated Title',
    subject: 'Updated Subject',
    content: 'Updated Content'
  })
})
