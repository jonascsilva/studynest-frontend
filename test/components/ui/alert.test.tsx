import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from '$/components/ui/alert'
import { renderWithContext } from '../../customRender'
import userEvent from '@testing-library/user-event'

describe('Alert Component', () => {
  it('renders the Alert with title and description', () => {
    renderWithContext(() => <Alert title='Test Title'>Test Description</Alert>)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders the Alert with only title when no children are provided', () => {
    renderWithContext(() => <Alert title='Test Title' />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('renders the startElement when provided', () => {
    renderWithContext(() => (
      <Alert title='Test Title' startElement={<div data-testid='start-element'>Start</div>}>
        Test Description
      </Alert>
    ))

    expect(screen.getByTestId('start-element')).toBeInTheDocument()
  })

  it('renders the icon when provided and no startElement', () => {
    renderWithContext(() => (
      <Alert title='Test Title' icon={<div data-testid='icon-element'>Icon</div>}>
        Test Description
      </Alert>
    ))

    expect(screen.getByTestId('icon-element')).toBeInTheDocument()
  })

  it('renders the endElement when provided', () => {
    renderWithContext(() => (
      <Alert title='Test Title' endElement={<div data-testid='end-element'>End</div>}>
        Test Description
      </Alert>
    ))

    expect(screen.getByTestId('end-element')).toBeInTheDocument()
  })

  it('renders the CloseButton when closable is true', () => {
    renderWithContext(() => (
      <Alert title='Test Title' closable>
        Test Description
      </Alert>
    ))

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onClose when CloseButton is clicked', async () => {
    const user = userEvent.setup()

    const onCloseMock = vi.fn()

    renderWithContext(() => (
      <Alert title='Test Title' closable onClose={onCloseMock}>
        Test Description
      </Alert>
    ))

    const closeButton = screen.getByRole('button')

    await user.click(closeButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
