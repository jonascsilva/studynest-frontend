import { describe, expect, it, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithContext } from '../../customRender'
import { Note } from '$/components/Note'
import userEvent from '@testing-library/user-event'
import { useMutation } from '@tanstack/react-query'
import { generateNote } from '$/query/notes'
import { NoteType } from '$/types'

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useMutation: vi.fn().mockReturnValue({})
  }
})

describe('Note Component', () => {
  let mutationMock: any
  let aiMutationMock: any

  beforeEach(() => {
    mutationMock = {
      mutateAsync: vi.fn().mockResolvedValue({}),
      isPending: false,
      isSuccess: false,
      isError: false
    }

    aiMutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    }

    vi.mocked(useMutation).mockImplementation((options: any) => {
      if (options.mutationFn === generateNote) {
        return aiMutationMock
      }

      return mutationMock
    })
  })

  it('should render correctly in create mode', () => {
    renderWithContext(() => <Note mutation={mutationMock} />)

    expect(screen.getByRole('heading', { name: /Criar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleInput, contentTextarea] = textboxes

    expect(subjectInput).toHaveValue('')
    expect(titleInput).toHaveValue('')
    expect(contentTextarea).toHaveValue('')
  })

  it('should render correctly in edit mode', () => {
    const note = {
      subject: 'Test Subject',
      title: 'Test Title',
      content: 'Test Content'
    } as NoteType

    renderWithContext(() => <Note mutation={mutationMock} note={note} />)

    expect(screen.getByRole('heading', { name: /Editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleInput, contentTextarea] = textboxes

    expect(subjectInput).toHaveValue('Test Subject')
    expect(titleInput).toHaveValue('Test Title')
    expect(contentTextarea).toHaveValue('Test Content')
  })

  it('should submit the form correctly', async () => {
    const user = userEvent.setup()

    renderWithContext(() => <Note mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleInput, contentTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(titleInput, 'Test Title')
    await user.type(contentTextarea, 'Test Content')

    const saveButton = screen.getByRole('button', { name: /Salvar/i })

    expect(saveButton).toBeInTheDocument()
    expect(saveButton).not.toBeDisabled()

    await user.click(saveButton)

    expect(mutationMock.mutateAsync).toHaveBeenCalledWith({
      subject: 'Test Subject',
      title: 'Test Title',
      content: 'Test Content'
    })

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()
    })

    expect(subjectInput).toHaveValue('Test Subject')
    expect(titleInput).toHaveValue('Test Title')
    expect(contentTextarea).toHaveValue('Test Content')
  })

  it('should disable inputs and buttons when mutation is pending', async () => {
    mutationMock.isPending = true

    renderWithContext(() => <Note mutation={mutationMock} />)

    const closeButton = screen.getByRole('button', { name: /Close/i })
    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    expect(closeButton).toBeDisabled()
    expect(generateButton).not.toBeDisabled()

    const textboxes = screen.getAllByRole('textbox')

    textboxes.forEach(textbox => {
      expect(textbox).toBeDisabled()
    })

    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()
  })

  it('should disable inputs and buttons when aiMutation is pending', async () => {
    aiMutationMock.isPending = true

    renderWithContext(() => <Note mutation={mutationMock} />)

    const closeButton = screen.getByRole('button', { name: /Close/i })
    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    expect(closeButton).toBeDisabled()
    expect(generateButton).toBeDisabled()

    const textboxes = screen.getAllByRole('textbox')

    textboxes.forEach(textbox => {
      expect(textbox).toBeDisabled()
    })

    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()
  })

  it('should call aiMutation.mutate with correct data when clicking Gerar', async () => {
    const user = userEvent.setup()

    renderWithContext(() => <Note mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleInput] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(titleInput, 'Test Title')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(aiMutationMock.mutate).toHaveBeenCalledWith({
      subject: 'Test Subject',
      title: 'Test Title'
    })
  })

  it('should update the content field when aiMutation succeeds', async () => {
    const generatedContent = 'Generated Content'

    vi.mocked(useMutation).mockImplementation((options: any) => {
      if (options.mutationFn === generateNote) {
        return {
          ...aiMutationMock,
          mutate: () => {
            options.onSuccess({ content: generatedContent })
          },
          isPending: false
        }
      }
      return mutationMock
    })

    const user = userEvent.setup()

    renderWithContext(() => <Note mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleInput, contentTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(titleInput, 'Test Title')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(contentTextarea).toHaveValue(generatedContent)

    const saveButton = screen.getByRole('button', { name: /Salvar/i })

    expect(saveButton).toBeInTheDocument()
    expect(saveButton).not.toBeDisabled()
  })
})
