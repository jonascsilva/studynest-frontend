import { describe, it, expect, vi } from 'vitest'
import { Pending } from '$/components/Pending'
import { renderWithContext } from '../../customRender'
import { screen } from '@testing-library/react'

vi.mock('$/components/Pending/index.module.scss', () => ({
  default: {
    container: 'container',
    fullPage: 'fullPage'
  }
}))

describe('Pending Component', () => {
  it('renders the Spinner component', () => {
    renderWithContext(() => <Pending />)

    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()
  })

  it('applies only container class when fullPage prop is not provided', () => {
    renderWithContext(() => <Pending />)

    const containerDiv = screen.getByRole('status').parentElement

    expect(containerDiv).toHaveClass('container')
    expect(containerDiv).not.toHaveClass('fullPage')
  })

  it('applies fullPage class when fullPage prop is true', () => {
    renderWithContext(() => <Pending fullPage={true} />)

    const containerDiv = screen.getByRole('status').parentElement

    expect(containerDiv).toHaveClass('container', 'fullPage')
  })

  it('does not apply fullPage class when fullPage prop is false', () => {
    renderWithContext(() => <Pending fullPage={false} />)

    const containerDiv = screen.getByRole('status').parentElement

    expect(containerDiv).toHaveClass('container')
    expect(containerDiv).not.toHaveClass('fullPage')
  })
})
