import { screen } from '@testing-library/react'
import { expect, it, vi, Mock } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Component } from '$/routes/notes/$noteId'
import { updateNote } from '$/query/notes'
import { useParams } from '@tanstack/react-router'
import { queryClient } from '$/lib/query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { renderWithContext } from '../../../customRender'

vi.mock('$/query/notes', () => ({
  updateNote: vi.fn()
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

it('Index component fetches and renders note data, and updates note on form submit', async () => {
  const user = userEvent.setup()

  const noteMockId = '123'

  ;(useParams as Mock).mockReturnValue({ noteId: noteMockId })

  const noteMock = {
    id: noteMockId,
    title: 'Original Title',
    subject: 'Original Subject',
    content: 'Original Content'
  }

  ;(useSuspenseQuery as Mock).mockReturnValue({
    data: noteMock
  })

  const mutationFnMock = vi.fn().mockResolvedValue({
    ...noteMock,
    title: 'Updated Title',
    subject: 'Updated Subject',
    content: 'Updated Content'
  })

  ;(updateNote as Mock).mockReturnValue(mutationFnMock)

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

  expect(queryClient.setQueryData).toHaveBeenCalledWith(['notes', { noteId: noteMockId }], {
    id: noteMockId,
    title: 'Updated Title',
    subject: 'Updated Subject',
    content: 'Updated Content'
  })
})
