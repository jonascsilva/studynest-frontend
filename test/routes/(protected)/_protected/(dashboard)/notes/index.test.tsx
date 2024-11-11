import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/notes'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { notesQueryOptions } from '$/query/notesOptions'
import { deleteNote } from '$/query/notes'

vi.mock('$/query/notes')

vi.mock(import('$/query/notesOptions'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    notesQueryOptions: vi.fn().mockReturnValue({ queryFn: vi.fn() })
  }
})

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

describe('Notes Component', () => {
  const notesMock = [
    {
      id: '1',
      title: 'Note 1',
      subject: 'Subject 1',
      updatedAt: '2023-01-01'
    },
    {
      id: '2',
      title: 'Note 2',
      subject: 'Subject 2',
      updatedAt: '2023-01-02'
    }
  ]

  beforeEach(() => {
    vi.mocked(notesQueryOptions().queryFn as Mock).mockResolvedValue(notesMock)
    vi.mocked(useSuspenseQuery).mockReturnValue({ data: notesMock } as UseSuspenseQueryResult<
      unknown,
      unknown
    >)
  })

  it('should render the notes list', async () => {
    renderWithContext(Component)

    expect(screen.getByRole('heading', { name: /anotações/i })).toBeInTheDocument()

    notesMock.forEach(note => {
      expect(screen.getByText(note.title)).toBeInTheDocument()
      expect(screen.getByText(note.subject)).toBeInTheDocument()
      expect(screen.getByText(note.updatedAt)).toBeInTheDocument()
    })
  })

  it('should call deleteNote when delete button is clicked', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })

    expect(deleteButtons.length).toBe(notesMock.length)

    await user.click(deleteButtons[0])

    expect(deleteNote).toHaveBeenCalledWith(notesMock[0].id)
  })
})
