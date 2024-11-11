import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '$/components/ui/button'
import { renderWithContext } from '../../customRender'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  it('renders children when not loading', () => {
    renderWithContext(() => <Button>Click Me</Button>)

    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('renders spinner and hides children when loading without loadingText', () => {
    renderWithContext(() => <Button loading>Click Me</Button>)

    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()

    const hiddenChildren = screen.getByText('Click Me')

    expect(hiddenChildren).toBeInTheDocument()
    expect(hiddenChildren).toHaveStyle('opacity: 0')
  })

  it('renders spinner and loadingText when loading with loadingText', () => {
    renderWithContext(() => (
      <Button loading loadingText='Loading...'>
        Click Me
      </Button>
    ))

    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument()
  })

  it('disables the button when loading', () => {
    renderWithContext(() => <Button loading>Click Me</Button>)

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('disables the button when disabled prop is true', () => {
    renderWithContext(() => <Button disabled>Click Me</Button>)

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('calls onClick when not disabled or loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    renderWithContext(() => <Button onClick={onClick}>Click Me</Button>)

    const button = screen.getByRole('button')

    await user.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when button is disabled', async () => {
    const onClick = vi.fn()

    const user = userEvent.setup()

    renderWithContext(() => (
      <Button disabled onClick={onClick}>
        Click Me
      </Button>
    ))

    const button = screen.getByRole('button')

    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('passes additional props to the ChakraButton', () => {
    renderWithContext(() => (
      <Button colorScheme='teal' size='lg'>
        Click Me
      </Button>
    ))

    const button = screen.getByRole('button')

    expect(button).toHaveClass('chakra-button')
  })
})
