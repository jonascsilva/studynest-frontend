import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Slider } from '$/components/ui/slider'
import { renderWithContext } from '../../customRender'

describe('Slider Component', () => {
  it('renders without crashing', () => {
    renderWithContext(() => <Slider />)

    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    renderWithContext(() => <Slider label='Test Label' />)

    expect(screen.getByText(/Test Label/i)).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    renderWithContext(() => <Slider />)

    expect(screen.queryByTestId('slider-label')).not.toBeInTheDocument()
  })

  it('sets margin bottom on control when hasMarkLabel is true', () => {
    const marks = [{ value: 10, label: 'Ten' }]

    renderWithContext(() => <Slider marks={marks} />)

    expect(screen.getByTestId('slider-control')).toHaveStyle({ marginBottom: '4' })
  })

  it('does not set margin bottom on control when hasMarkLabel is false', () => {
    const marks = [10, 20, 30]

    renderWithContext(() => <Slider marks={marks} />)

    expect(screen.getByTestId('slider-control')).toHaveStyle({ marginBottom: '' })
  })

  it('renders thumbs based on value array', () => {
    const value = [10, 20]

    renderWithContext(() => <Slider value={value} />)

    const thumbs = screen.getAllByTestId('slider-thumb')

    expect(thumbs).toHaveLength(2)
  })

  it('renders thumbs based on defaultValue array', () => {
    const defaultValue = [15, 25, 35]

    renderWithContext(() => <Slider defaultValue={defaultValue} />)

    const thumbs = screen.getAllByTestId('slider-thumb')
    expect(thumbs).toHaveLength(3)
  })

  it('does not render markers when marks are not provided', () => {
    renderWithContext(() => <Slider />)

    expect(screen.queryByTestId('slider-marker-group')).not.toBeInTheDocument()
  })

  it('processes marks correctly when marks are numbers', () => {
    const marks = [10, 20, 30]

    renderWithContext(() => <Slider marks={marks} />)

    const markers = screen.getAllByTestId('slider-marker')

    expect(markers).toHaveLength(3)

    markers.forEach((marker, index) => {
      expect(marker.getAttribute('data-value')).toBe(`${marks[index]}`)
    })
  })

  it('passes rest props to ChakraSlider.Root', () => {
    renderWithContext(() => <Slider orientation='vertical' />)

    expect(screen.getByRole('slider')).toHaveAttribute('data-orientation', 'vertical')
  })
})
