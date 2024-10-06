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

  expect(links.length).toBe(6)
})
