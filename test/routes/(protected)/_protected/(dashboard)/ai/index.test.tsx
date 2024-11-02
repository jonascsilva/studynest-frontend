import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/ai/index.lazy'
import { generateFlashcard } from '$/query/flashcards'

import { renderWithContext } from '../../../../../customRender'

vi.mock('$/query/flashcards')

describe('AI Component', () => {
  const generateFlashcardMock = vi.mocked(generateFlashcard)

  beforeEach(() => {
    vi.clearAllMocks()

    generateFlashcardMock.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                answer: 'This is the generated answer.',
                question: 'What is the capital of France?',
                subject: 'Geography'
              }),
            100
          )
        )
    )
  })

  it('should render the initial state correctly', () => {
    renderWithContext(Component)

    expect(screen.getByRole('button', { name: /gerar/i })).toBeInTheDocument()
    expect(screen.queryByText('This is the generated answer.')).not.toBeInTheDocument()
    expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument()
    expect(screen.queryByText('Geography')).not.toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should show the spinner during mutation and display data after success', async () => {
    const user = userEvent.setup()

    renderWithContext(Component)

    await user.click(screen.getByRole('button', { name: /gerar/i }))

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(generateFlashcardMock).toHaveBeenCalled()
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Geography')).toBeInTheDocument()
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    expect(screen.getByText('This is the generated answer.')).toBeInTheDocument()
  })

  it('should handle mutation errors gracefully', async () => {
    const user = userEvent.setup()

    generateFlashcardMock.mockImplementation(
      () => new Promise((_, reject) => setTimeout(() => reject(new Error('Network Error')), 100))
    )

    renderWithContext(Component)

    await user.click(screen.getByRole('button', { name: /gerar/i }))

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(generateFlashcardMock).toHaveBeenCalled()
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(screen.queryByText('Geography')).not.toBeInTheDocument()
    expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument()
    expect(screen.queryByText('This is the generated answer.')).not.toBeInTheDocument()
  })
})
