import { expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { Sidebar } from '$/cmps/Sidebar'
import { renderWithContext } from '../../customRender'

it('should render correctly', () => {
  renderWithContext(Sidebar)

  expect(screen.getByText('Study')).toBeInTheDocument()
  expect(screen.getByText('Nest')).toBeInTheDocument()
})
