import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithContext } from '../../customRender'
import { Flashcard } from '$/components/Flashcard'
import userEvent from '@testing-library/user-event'
import { useMutation } from '@tanstack/react-query'
import { generateFlashcard } from '$/query/flashcards'
import { FlashcardType } from '$/types'

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useMutation: vi.fn().mockReturnValue({})
  }
})

describe('Flashcard Component', () => {
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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }

      return mutationMock
    })

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    expect(screen.getByRole('heading', { name: /Criar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionTextarea, answerTextarea] = textboxes

    expect(subjectInput).toHaveValue('')
    expect(questionTextarea).toHaveValue('')
    expect(answerTextarea).toHaveValue('')
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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }

      return mutationMock
    })

    const flashcard = {
      subject: 'Test Subject',
      question: 'Test Question',
      answer: 'Test Answer'
    } as FlashcardType

    renderWithContext(() => <Flashcard mutation={mutationMock} flashcard={flashcard} />)

    expect(screen.getByRole('heading', { name: /Editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionTextarea, answerTextarea] = textboxes

    expect(subjectInput).toHaveValue('Test Subject')
    expect(questionTextarea).toHaveValue('Test Question')
    expect(answerTextarea).toHaveValue('Test Answer')
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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }

      return mutationMock
    })

    const user = userEvent.setup()

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionTextarea, answerTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(questionTextarea, 'Test Question')
    await user.type(answerTextarea, 'Test Answer')

    const saveButton = screen.getByRole('button', { name: /Salvar/i })

    await user.click(saveButton)

    expect(mutationMock.mutate).toHaveBeenCalledWith({
      subject: 'Test Subject',
      question: 'Test Question',
      answer: 'Test Answer'
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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }
      return mutationMock
    })

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }

      return mutationMock
    })

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }
      return mutationMock
    })

    const user = userEvent.setup()

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(questionTextarea, 'Test Question')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(aiMutationMock.mutate).toHaveBeenCalledWith({
      subject: 'Test Subject',
      question: 'Test Question'
    })
  })

  it('should update the answer field when aiMutation succeeds', async () => {
    const mutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    } as any

    const generatedAnswer = 'Generated Answer'

    const aiMutationMock = {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false
    }

    vi.mocked(useMutation).mockImplementation((options: any) => {
      if (options.mutationFn === generateFlashcard) {
        return {
          ...aiMutationMock,
          mutate: () => {
            options.onSuccess({ answer: generatedAnswer })
          },
          isPending: false
        }
      }
      return mutationMock
    })

    const user = userEvent.setup()

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionTextarea, answerTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(questionTextarea, 'Test Question')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(answerTextarea).toHaveValue(generatedAnswer)
  })
})
