import { Index } from '$/routes/index.lazy'
import { screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import { renderWithContext } from '../customRender'

it('renders the index route', async () => {
  renderWithContext(Index)

  await screen.findByText(/Study/i)

  expect(screen.getByText(/Study/i)).toBeInTheDocument()
})
