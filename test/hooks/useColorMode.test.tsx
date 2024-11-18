import { render, screen } from '@testing-library/react'
import { useColorMode } from '$/hooks/useColorMode'
import { useTheme } from 'next-themes'
import { vi, describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('next-themes', () => ({
  useTheme: vi.fn()
}))

describe('useColorMode hook', () => {
  it('should return the current colorMode and setColorMode function', () => {
    const setThemeMock = vi.fn()

    vi.mocked(useTheme).mockReturnValue({
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
      setTheme: setThemeMock
    })

    const TestComponent = () => {
      const { colorMode, setColorMode } = useColorMode()

      return (
        <div>
          <span data-testid='color-mode'>{colorMode}</span>
          <button onClick={() => setColorMode('dark')}>Set Dark</button>
        </div>
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('color-mode').textContent).toBe('light')
  })

  it('should toggle color mode from light to dark', async () => {
    const user = userEvent.setup()

    let resolvedTheme = 'light'

    const setThemeMock = vi.fn(newTheme => {
      resolvedTheme = newTheme
    })

    vi.mocked(useTheme).mockImplementation(() => ({
      themes: ['light', 'dark'],
      resolvedTheme,
      setTheme: setThemeMock
    }))

    const TestComponent = () => {
      const { toggleColorMode } = useColorMode()

      return (
        <button onClick={toggleColorMode} data-testid='toggle-button'>
          Toggle Color Mode
        </button>
      )
    }

    render(<TestComponent />)

    const button = screen.getByTestId('toggle-button')

    await user.click(button)

    expect(setThemeMock).toHaveBeenCalledWith('dark')
  })

  it('should toggle color mode from dark to light', async () => {
    const user = userEvent.setup()

    let resolvedTheme = 'dark'

    const setThemeMock = vi.fn(newTheme => {
      resolvedTheme = newTheme
    })

    vi.mocked(useTheme).mockImplementation(() => ({
      themes: ['light', 'dark'],
      resolvedTheme,
      setTheme: setThemeMock
    }))

    const TestComponent = () => {
      const { toggleColorMode } = useColorMode()

      return (
        <button onClick={toggleColorMode} data-testid='toggle-button'>
          Toggle Color Mode
        </button>
      )
    }

    render(<TestComponent />)

    const button = screen.getByTestId('toggle-button')

    await user.click(button)

    expect(setThemeMock).toHaveBeenCalledWith('light')
  })
})
