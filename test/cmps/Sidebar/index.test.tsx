import { expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { Sidebar } from '$/cmps/Sidebar'
import { renderWithContext } from '../../customRender'

it('Sidebar renders correctly', () => {
  renderWithContext(Sidebar)

  expect(screen.getByText('Study')).toBeInTheDocument()
  expect(screen.getByText('Nest')).toBeInTheDocument()
})

it('Sidebar has four links', () => {
  const { getAllByRole } = renderWithContext(Sidebar)

  const links = getAllByRole('link')

  expect(links.length).toBe(7)
})
