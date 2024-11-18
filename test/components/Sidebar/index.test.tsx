import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Sidebar } from '$/components/Sidebar'
import { ReactNode } from 'react'
import { renderWithContext } from '../../customRender'
import userEvent from '@testing-library/user-event'

vi.mock('$/components/Sidebar/index.module.scss', () => ({
  default: {
    sidebar: 'sidebar',
    heading: 'heading',
    link: 'link'
  }
}))

vi.mock('$/components/ui/button', () => {
  const ButtonMock = vi.fn(({ children, colorPalette, ...props }) => {
    return (
      <button data-colorpalette={colorPalette} {...props}>
        {children}
      </button>
    )
  })

  return {
    Button: ButtonMock
  }
})

const useAuthMock = vi.fn()

vi.mock('$/hooks/useAuth', () => ({
  useAuth: () => useAuthMock()
}))

let activeRoutes: string[] = []

vi.mock(import('@tanstack/react-router'), async importOriginal => {
  const actual = await importOriginal()

  const LinkMock: any = ({
    to,
    className,
    children
  }: {
    to: string
    className: string
    children: ({ isActive }: { isActive: boolean }) => ReactNode
  }) => {
    const isActive = activeRoutes.includes(to)

    return (
      <a href={to} className={className}>
        {children({ isActive })}
      </a>
    )
  }

  return {
    ...actual,
    useNavigate: vi.fn(),
    Link: LinkMock
  }
})

describe('Sidebar Component', () => {
  beforeEach(() => {
    activeRoutes = []
  })

  it('should render the Sidebar with all links', () => {
    const logoutMock = vi.fn()

    useAuthMock.mockReturnValue({ logout: logoutMock })

    renderWithContext(() => <Sidebar />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('StudyNest')

    const links = [
      { text: 'Home', href: '/home' },
      { text: 'Anotações', href: '/notes' },
      { text: 'Flashcards', href: '/flashcards' },
      { text: 'Configurações', href: '/settings' }
    ]

    links.forEach(({ text, href }) => {
      const link = screen.getByText(text).closest('a')
      expect(link).toHaveAttribute('href', href)
    })

    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('should call logout when logout button is clicked', async () => {
    const logoutMock = vi.fn()

    useAuthMock.mockReturnValue({ logout: logoutMock })

    const user = userEvent.setup()

    renderWithContext(() => <Sidebar />)

    const logoutButton = screen.getByText('Sair')

    await user.click(logoutButton)

    expect(logoutMock).toHaveBeenCalledTimes(1)
  })

  it('should apply colorPalette="blue" to active links', () => {
    const logoutMock = vi.fn()
    useAuthMock.mockReturnValue({ logout: logoutMock })

    activeRoutes = ['/home', '/flashcards']

    renderWithContext(() => <Sidebar />)

    const activeLinks = ['Home', 'Flashcards']

    activeLinks.forEach(text => {
      const button = screen.getByText(text).closest('button')

      expect(button).toHaveAttribute('data-colorpalette', 'blue')
    })

    const inactiveLinks = ['Anotações', 'Configurações']

    inactiveLinks.forEach(text => {
      const button = screen.getByText(text).closest('button')

      expect(button).not.toHaveAttribute('data-colorpalette')
    })
  })

  it('should apply colorPalette="blue" to all links when all routes are active', () => {
    const logoutMock = vi.fn()
    useAuthMock.mockReturnValue({ logout: logoutMock })

    activeRoutes = ['/home', '/flashcards', '/notes', '/settings']

    renderWithContext(() => <Sidebar />)

    const activeLinks = ['Home', 'Flashcards', 'Anotações', 'Configurações']

    activeLinks.forEach(text => {
      const button = screen.getByText(text).closest('button')

      expect(button).toHaveAttribute('data-colorpalette', 'blue')
    })
  })

  it('should not apply colorPalette="blue" to any links when no routes are active', () => {
    const logoutMock = vi.fn()

    useAuthMock.mockReturnValue({ logout: logoutMock })

    activeRoutes = []

    renderWithContext(() => <Sidebar />)

    const links = ['Home', 'Anotações', 'Flashcards', 'Configurações']

    links.forEach(text => {
      const button = screen.getByText(text).closest('button')
      expect(button).not.toHaveAttribute('colorPalette')
    })
  })
})
