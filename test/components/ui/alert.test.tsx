import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from '$/components/ui/alert'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import userEvent from '@testing-library/user-event'

describe('Alert Component', () => {
  it('should render the Alert with title and description', () => {
    render(
      <ChakraProvider>
        <Alert title='Test Title'>Test Description</Alert>
      </ChakraProvider>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('should render the Alert with title only when no children are provided', () => {
    render(
      <ChakraProvider>
        <Alert title='Test Title' />{' '}
      </ChakraProvider>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('should render the startElement when provided', () => {
    render(
      <ChakraProvider>
        <Alert title='Test Title' startElement={<div data-testid='start-element'>Start</div>}>
          Test Description
        </Alert>
      </ChakraProvider>
    )

    expect(screen.getByTestId('start-element')).toBeInTheDocument()
  })

  it('should render the icon when provided and no startElement', () => {
    render(
      <ChakraProvider>
        <Alert title='Test Title' icon={<div data-testid='icon-element'>Icon</div>}>
          Test Description
        </Alert>
      </ChakraProvider>
    )

    expect(screen.getByTestId('icon-element')).toBeInTheDocument()
  })

  it('should render the endElement when provided', () => {
    render(
      <ChakraProvider>
        <Alert title='Test Title' endElement={<div data-testid='end-element'>End</div>}>
          Test Description
        </Alert>
      </ChakraProvider>
    )

    expect(screen.getByTestId('end-element')).toBeInTheDocument()
  })

  it('should render the CloseButton when closable is true', () => {
    render(
      <ChakraProvider>
        <Alert title='Test Title' closable>
          Test Description
        </Alert>
      </ChakraProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should call onClose when CloseButton is clicked', async () => {
    const user = userEvent.setup()

    const onCloseMock = vi.fn()

    render(
      <ChakraProvider>
        (
        <Alert title='Test Title' closable onClose={onCloseMock}>
          Test Description
        </Alert>
      </ChakraProvider>
    )

    const closeButton = screen.getByRole('button')

    await user.click(closeButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
