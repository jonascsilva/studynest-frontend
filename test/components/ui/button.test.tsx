import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '$/components/ui/button'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  it('should render children when not loading', () => {
    render(
      <ChakraProvider>
        <Button>Click Me</Button>
      </ChakraProvider>
    )

    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('should render spinner and hides children when loading without loadingText', () => {
    render(
      <ChakraProvider>
        <Button loading>Click Me</Button>
      </ChakraProvider>
    )

    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()

    const hiddenChildren = screen.getByText('Click Me')

    expect(hiddenChildren).toBeInTheDocument()
    expect(hiddenChildren).toHaveStyle('opacity: 0')
  })

  it('should render spinner and loadingText when loading with loadingText', () => {
    render(
      <ChakraProvider>
        <Button loading loadingText='Loading...'>
          Click Me
        </Button>
      </ChakraProvider>
    )

    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument()
  })

  it('should disable the button when loading', () => {
    render(
      <ChakraProvider>
        <Button loading>Click Me</Button>
      </ChakraProvider>
    )

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should disable the button when disabled prop is true', () => {
    render(
      <ChakraProvider>
        <Button disabled>Click Me</Button>
      </ChakraProvider>
    )

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should call onClick when not disabled or loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Button onClick={onClick}>Click Me</Button>
      </ChakraProvider>
    )

    const button = screen.getByRole('button')

    await user.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should call onClick when button is disabled', async () => {
    const onClick = vi.fn()

    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Button disabled onClick={onClick}>
          Click Me
        </Button>
      </ChakraProvider>
    )

    const button = screen.getByRole('button')

    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('should pass additional props to the ChakraButton', () => {
    render(
      <ChakraProvider>
        <Button colorScheme='teal' size='lg'>
          Click Me
        </Button>
      </ChakraProvider>
    )

    const button = screen.getByRole('button')

    expect(button).toHaveClass('chakra-button')
  })
})
