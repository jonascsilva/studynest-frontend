import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PasswordInput, PasswordStrengthMeter } from '$/components/ui/password-input'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import userEvent from '@testing-library/user-event'

vi.mock('react-icons/lu', () => ({
  LuEye: () => <svg data-testid='lu-eye-icon' />,
  LuEyeOff: () => <svg data-testid='lu-eye-off-icon' />
}))

describe('PasswordInput Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    render(
      <ChakraProvider>
        <PasswordInput />
      </ChakraProvider>
    )

    expect(screen.getByTestId('input-group')).toBeInTheDocument()
  })

  it('should toggle password visibility when icon is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <PasswordInput />
      </ChakraProvider>
    )

    const input = screen.getByRole('textbox')

    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility' })

    expect(input).toHaveAttribute('type', 'password')

    await user.click(toggleButton)

    expect(input).toHaveAttribute('type', 'text')

    await user.click(toggleButton)

    expect(input).toHaveAttribute('type', 'password')
  })

  it('should not toggle visibility when input is disabled', () => {
    render(
      <ChakraProvider>
        <PasswordInput disabled />
      </ChakraProvider>
    )

    const input = screen.getByRole('textbox')

    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility' })

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.pointerDown(toggleButton, { button: 0 })

    expect(input).toHaveAttribute('type', 'password')
  })

  it('should not toggle visibility when pointer event button is not 0', () => {
    render(
      <ChakraProvider>
        <PasswordInput />
      </ChakraProvider>
    )

    const input = screen.getByRole('textbox')

    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility' })

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.pointerDown(toggleButton, { button: 1 })

    expect(input).toHaveAttribute('type', 'password')
  })

  it('should respect defaultVisible prop', () => {
    render(
      <ChakraProvider>
        <PasswordInput defaultVisible />
      </ChakraProvider>
    )

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('type', 'text')
  })

  it('should call onVisibleChange when visibility changes', async () => {
    const onVisibleChange = vi.fn()

    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <PasswordInput onVisibleChange={onVisibleChange} />
      </ChakraProvider>
    )

    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility' })

    await user.click(toggleButton)

    expect(onVisibleChange).toHaveBeenCalledWith(true)

    await user.click(toggleButton)

    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })

  it('should render custom visibility icons when provided', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <PasswordInput
          visibilityIcon={{
            on: <div data-testid='custom-on-icon'>On Icon</div>,
            off: <div data-testid='custom-off-icon'>Off Icon</div>
          }}
        />
      </ChakraProvider>
    )

    expect(screen.getByTestId('custom-on-icon')).toBeInTheDocument()

    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility' })

    await user.click(toggleButton)

    expect(screen.getByTestId('custom-off-icon')).toBeInTheDocument()
  })

  it('should disable toggle button when input is disabled', () => {
    render(
      <ChakraProvider>
        <PasswordInput disabled />
      </ChakraProvider>
    )

    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility' })

    expect(toggleButton).toBeDisabled()
  })
})

describe('PasswordStrengthMeter Component', () => {
  it('should render correct number of bars based on max prop', () => {
    render(
      <ChakraProvider>
        <PasswordStrengthMeter value={2} max={5} />
      </ChakraProvider>
    )

    const bars = screen.getAllByRole('progressbar')

    expect(bars).toHaveLength(5)
  })

  it('should highlight correct number of bars based on value', () => {
    render(
      <ChakraProvider>
        <PasswordStrengthMeter value={3} max={4} />
      </ChakraProvider>
    )

    const bars = screen.getAllByRole('progressbar')

    expect(bars[0]).toHaveAttribute('data-selected', '')
    expect(bars[1]).toHaveAttribute('data-selected', '')
    expect(bars[2]).toHaveAttribute('data-selected', '')
    expect(bars[3]).not.toHaveAttribute('data-selected')
  })

  it('should display correct label based on value percentage', () => {
    const { rerender } = render(
      <ChakraProvider>
        <PasswordStrengthMeter value={1} max={4} />
      </ChakraProvider>
    )

    expect(screen.getByText('Low')).toBeInTheDocument()

    rerender(
      <ChakraProvider>
        <PasswordStrengthMeter value={2} max={4} />
      </ChakraProvider>
    )

    expect(screen.getByText('Medium')).toBeInTheDocument()

    rerender(
      <ChakraProvider>
        <PasswordStrengthMeter value={4} max={4} />
      </ChakraProvider>
    )

    expect(screen.getByText('High')).toBeInTheDocument()
  })
})
