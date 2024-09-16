import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { Sidebar } from '$/cmps/Sidebar'
import { renderWithContext } from '../../customRender'

test('Sidebar renders correctly', () => {
  renderWithContext(() => <Sidebar />)

  expect(screen.getByText('Study')).toBeInTheDocument()
  expect(screen.getByText('Nest')).toBeInTheDocument()
})

test('Sidebar has four links', () => {
  const { getAllByRole } = renderWithContext(() => <Sidebar />)

  const links = getAllByRole('link')

  expect(links.length).toBe(4)
})

test('First link is to dashboard', () => {
  const { getAllByRole } = renderWithContext(() => <Sidebar />)

  const links = getAllByRole('link')

  expect(links[0]).toHaveAttribute('href', '/dashboard')
})

test('Second link is to dashboard', () => {
  const { getAllByRole } = renderWithContext(() => <Sidebar />)

  const links = getAllByRole('link')

  expect(links[1]).toHaveAttribute('href', '/dashboard')
})

test('Third link is to notes', () => {
  const { getAllByRole } = renderWithContext(() => <Sidebar />)

  const links = getAllByRole('link')

  expect(links[2]).toHaveAttribute('href', '/notes')
})

test('Fourth link is to home', () => {
  const { getAllByRole } = renderWithContext(() => <Sidebar />)

  const links = getAllByRole('link')

  expect(links[3]).toHaveAttribute('href', '/')
})
