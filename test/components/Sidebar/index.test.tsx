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
    const signoutMock = vi.fn()

    useAuthMock.mockReturnValue({ signout: signoutMock, isAuthenticated: true })

    renderWithContext(() => <Sidebar />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('StudyNest')

    const links = [
      { text: 'Home', href: '/home' },
      { text: 'Explorar', href: '/explore' },
      { text: 'Flashcards', href: '/flashcards' },
      { text: 'Anotações', href: '/notes' },
      { text: 'FAQ', href: '/faq' },
      { text: 'Configurações', href: '/settings' }
    ]

    links.forEach(({ text, href }) => {
      const link = screen.getByText(text).closest('a')
      expect(link).toHaveAttribute('href', href)
    })

    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('should call SignOut when SignOut button is clicked', async () => {
    const signoutMock = vi.fn()

    useAuthMock.mockReturnValue({ signout: signoutMock, isAuthenticated: true })

    const user = userEvent.setup()

    renderWithContext(() => <Sidebar />)

    const signoutButton = screen.getByText('Sair')

    await user.click(signoutButton)

    expect(signoutMock).toHaveBeenCalledTimes(1)
  })

  it('should apply colorPalette="blue" to active links', () => {
    const signoutMock = vi.fn()
    useAuthMock.mockReturnValue({ signout: signoutMock, isAuthenticated: true })

    activeRoutes = ['/home', '/flashcards']

    renderWithContext(() => <Sidebar />)

    const activeLinks = ['Home', 'Flashcards']

    activeLinks.forEach(text => {
      const button = screen.getByText(text).closest('button')

      expect(button).toHaveAttribute('data-colorpalette', 'blue')
    })

    const inactiveLinks = ['Explorar', 'Anotações', 'FAQ', 'Configurações']

    inactiveLinks.forEach(text => {
      const button = screen.getByText(text).closest('button')

      expect(button).not.toHaveAttribute('data-colorpalette')
    })
  })

  it('should apply colorPalette="blue" to all links when all routes are active', () => {
    const signoutMock = vi.fn()
    useAuthMock.mockReturnValue({ signout: signoutMock, isAuthenticated: true })

    activeRoutes = ['/home', '/explore', '/flashcards', '/notes', '/faq', '/settings']

    renderWithContext(() => <Sidebar />)

    const activeLinks = ['Home', 'Explorar', 'Flashcards', 'Anotações', 'FAQ', 'Configurações']

    activeLinks.forEach(text => {
      const button = screen.getByText(text).closest('button')

      expect(button).toHaveAttribute('data-colorpalette', 'blue')
    })
  })

  it('should not apply colorPalette="blue" to any links when no routes are active', () => {
    const signoutMock = vi.fn()

    useAuthMock.mockReturnValue({ signout: signoutMock, isAuthenticated: true })

    activeRoutes = []

    renderWithContext(() => <Sidebar />)

    const links = ['Home', 'Explorar', 'Flashcards', 'Anotações', 'FAQ', 'Configurações']

    links.forEach(text => {
      const button = screen.getByText(text).closest('button')
      expect(button).not.toHaveAttribute('colorPalette')
    })
  })
})
