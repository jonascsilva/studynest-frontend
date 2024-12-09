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
  it('should render the Spinner component', () => {
    renderWithContext(() => <Pending />)

    const spinner = screen.getByTestId('spinner')

    expect(spinner).toBeInTheDocument()
  })

  it('should apply only container class when fullPage prop is not provided', () => {
    renderWithContext(() => <Pending />)

    const containerDiv = screen.getByTestId('spinner').parentElement

    expect(containerDiv).toHaveClass('container')
    expect(containerDiv).not.toHaveClass('fullPage')
  })

  it('should apply fullPage class when fullPage prop is true', () => {
    renderWithContext(() => <Pending fullPage={true} />)

    const containerDiv = screen.getByTestId('spinner').parentElement

    expect(containerDiv).toHaveClass('container', 'fullPage')
  })

  it('should not apply fullPage class when fullPage prop is false', () => {
    renderWithContext(() => <Pending fullPage={false} />)

    const containerDiv = screen.getByTestId('spinner').parentElement

    expect(containerDiv).toHaveClass('container')
    expect(containerDiv).not.toHaveClass('fullPage')
  })
})
