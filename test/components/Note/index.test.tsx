import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
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
  it('should render correctly in create mode', () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const aiMutationMock = {
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

    renderWithContext(() => <Note mutation={mutationMock} />)

    expect(screen.getByRole('heading', { name: /Criar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleTextarea, contentTextarea] = textboxes

    expect(subjectInput).toHaveValue('')
    expect(titleTextarea).toHaveValue('')
    expect(contentTextarea).toHaveValue('')
  })

  it('should render correctly in edit mode', () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const aiMutationMock = {
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

    const note = {
      subject: 'Test Subject',
      title: 'Test Title',
      content: 'Test Content'
    } as NoteType

    renderWithContext(() => <Note mutation={mutationMock} note={note} />)

    expect(screen.getByRole('heading', { name: /Editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleTextarea, contentTextarea] = textboxes

    expect(subjectInput).toHaveValue('Test Subject')
    expect(titleTextarea).toHaveValue('Test Title')
    expect(contentTextarea).toHaveValue('Test Content')
  })

  it('should submit the form correctly', async () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const aiMutationMock = {
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

    const user = userEvent.setup()

    renderWithContext(() => <Note mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleTextarea, contentTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(titleTextarea, 'Test Title')
    await user.type(contentTextarea, 'Test Content')

    const saveButton = screen.getByRole('button', { name: /Salvar/i })

    await user.click(saveButton)

    expect(mutationMock.mutate).toHaveBeenCalledWith({
      subject: 'Test Subject',
      title: 'Test Title',
      content: 'Test Content'
    })
  })

  it('should disable inputs and buttons when mutation is pending', () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: true,
      isSuccess: false,
      isError: false
    } as any

    const aiMutationMock = {
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

    renderWithContext(() => <Note mutation={mutationMock} />)

    const saveButton = screen.getByRole('button', { name: /Salvar/i })
    const closeButton = screen.getByRole('button', { name: /Close/i })
    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    expect(saveButton).toHaveAttribute('disabled')
    expect(closeButton).toHaveAttribute('disabled')
    expect(generateButton).not.toHaveAttribute('disabled')

    const textboxes = screen.getAllByRole('textbox')
    textboxes.forEach(textbox => {
      expect(textbox).toBeDisabled()
    })
  })

  it('should disable inputs and buttons when aiMutation is pending', () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const aiMutationMock = {
      mutate: vi.fn(),
      isPending: true,
      isSuccess: false,
      isError: false
    }

    vi.mocked(useMutation).mockImplementation((options: any) => {
      if (options.mutationFn === generateNote) {
        return aiMutationMock
      }

      return mutationMock
    })

    renderWithContext(() => <Note mutation={mutationMock} />)

    const saveButton = screen.getByRole('button', { name: /Salvar/i })
    const closeButton = screen.getByRole('button', { name: /Close/i })
    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    expect(saveButton).toHaveAttribute('disabled')
    expect(closeButton).toHaveAttribute('disabled')
    expect(generateButton).toHaveAttribute('disabled')

    const textboxes = screen.getAllByRole('textbox')

    textboxes.forEach(textbox => {
      expect(textbox).toBeDisabled()
    })
  })

  it('should call aiMutation.mutate with correct data when clicking Gerar', async () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const aiMutationMock = {
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

    const user = userEvent.setup()

    renderWithContext(() => <Note mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, titleTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(titleTextarea, 'Test Title')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(aiMutationMock.mutate).toHaveBeenCalledWith({
      subject: 'Test Subject',
      title: 'Test Title'
    })
  })

  it('should update the content field when aiMutation succeeds', async () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const generatedContent = 'Generated Content'

    const aiMutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    }

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

    const [subjectInput, titleTextarea, contentTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(titleTextarea, 'Test Title')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(contentTextarea).toHaveValue(generatedContent)
  })
})
