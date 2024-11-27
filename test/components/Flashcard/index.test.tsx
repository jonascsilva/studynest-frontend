import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
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
      if (options.mutationFn === generateFlashcard) {
        return aiMutationMock
      }

      return mutationMock
    })
  })

  it('should render correctly in create mode', () => {
    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    expect(screen.getByRole('heading', { name: /Criar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionInput, answerTextarea] = textboxes

    expect(subjectInput).toHaveValue('')
    expect(questionInput).toHaveValue('')
    expect(answerTextarea).toHaveValue('')
  })

  it('should render correctly in edit mode', () => {
    const flashcard = {
      subject: 'Test Subject',
      question: 'Test Title',
      answer: 'Test Answer'
    } as FlashcardType

    renderWithContext(() => <Flashcard mutation={mutationMock} flashcard={flashcard} />)

    expect(screen.getByRole('heading', { name: /Editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Gerar/i })).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionInput, answerTextarea] = textboxes

    expect(subjectInput).toHaveValue('Test Subject')
    expect(questionInput).toHaveValue('Test Title')
    expect(answerTextarea).toHaveValue('Test Answer')
  })

  it('should submit the form correctly', async () => {
    const user = userEvent.setup()

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionInput, answerTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(questionInput, 'Test Title')
    await user.type(answerTextarea, 'Test Answer')

    const saveButton = screen.getByRole('button', { name: /Salvar/i })

    expect(saveButton).toBeInTheDocument()
    expect(saveButton).not.toBeDisabled()

    await user.click(saveButton)

    expect(mutationMock.mutateAsync).toHaveBeenCalledWith({
      subject: 'Test Subject',
      question: 'Test Title',
      answer: 'Test Answer'
    })

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()
    })

    expect(subjectInput).toHaveValue('Test Subject')
    expect(questionInput).toHaveValue('Test Title')
    expect(answerTextarea).toHaveValue('Test Answer')
  })

  it('should disable inputs and buttons when mutation is pending', async () => {
    mutationMock.isPending = true

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

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

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

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

    renderWithContext(() => <Flashcard mutation={mutationMock} />)

    const textboxes = screen.getAllByRole('textbox')

    expect(textboxes).toHaveLength(3)

    const [subjectInput, questionInput] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(questionInput, 'Test Title')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(aiMutationMock.mutate).toHaveBeenCalledWith({
      subject: 'Test Subject',
      question: 'Test Title'
    })
  })

  it('should update the answer field when aiMutation succeeds', async () => {
    const generatedAnswer = 'Generated Answer'

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

    const [subjectInput, questionInput, answerTextarea] = textboxes

    await user.type(subjectInput, 'Test Subject')
    await user.type(questionInput, 'Test Title')

    const generateButton = screen.getByRole('button', { name: /Gerar/i })

    await user.click(generateButton)

    expect(answerTextarea).toHaveValue(generatedAnswer)

    const saveButton = screen.getByRole('button', { name: /Salvar/i })

    expect(saveButton).toBeInTheDocument()
    expect(saveButton).not.toBeDisabled()
  })
})
