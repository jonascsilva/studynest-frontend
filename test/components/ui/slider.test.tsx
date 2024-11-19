import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Slider } from '$/components/ui/slider'
import { Provider as ChakraProvider } from '$/components/ui/provider'

describe('Slider Component', () => {
  it('should render without crashing', () => {
    render(
      <ChakraProvider>
        <Slider />
      </ChakraProvider>
    )

    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('should render label when provided', () => {
    render(
      <ChakraProvider>
        <Slider label='Test Label' />
      </ChakraProvider>
    )

    expect(screen.getByText(/Test Label/i)).toBeInTheDocument()
  })

  it('should not render label when not provided', () => {
    render(
      <ChakraProvider>
        <Slider />
      </ChakraProvider>
    )

    expect(screen.queryByTestId('slider-label')).not.toBeInTheDocument()
  })

  it('should set margin bottom on control when hasMarkLabel is true', () => {
    const marks = [{ value: 10, label: 'Ten' }]

    render(
      <ChakraProvider>
        <Slider marks={marks} />
      </ChakraProvider>
    )

    expect(screen.getByTestId('slider-control')).toHaveStyle({ marginBottom: '4' })
  })

  it('should not set margin bottom on control when hasMarkLabel is false', () => {
    const marks = [10, 20, 30]

    render(
      <ChakraProvider>
        <Slider marks={marks} />
      </ChakraProvider>
    )

    expect(screen.getByTestId('slider-control')).toHaveStyle({ marginBottom: '' })
  })

  it('should render thumbs based on value array', () => {
    const value = [10, 20]

    render(
      <ChakraProvider>
        <Slider value={value} />
      </ChakraProvider>
    )

    const thumbs = screen.getAllByTestId('slider-thumb')

    expect(thumbs).toHaveLength(2)
  })

  it('should render thumbs based on defaultValue array', () => {
    const defaultValue = [15, 25, 35]

    render(
      <ChakraProvider>
        <Slider defaultValue={defaultValue} />
      </ChakraProvider>
    )

    const thumbs = screen.getAllByTestId('slider-thumb')
    expect(thumbs).toHaveLength(3)
  })

  it('should not render markers when marks are not provided', () => {
    render(
      <ChakraProvider>
        <Slider />
      </ChakraProvider>
    )

    expect(screen.queryByTestId('slider-marker-group')).not.toBeInTheDocument()
  })

  it('should handle marks correctly when marks are numbers', () => {
    const marks = [10, 20, 30]

    render(
      <ChakraProvider>
        <Slider marks={marks} />
      </ChakraProvider>
    )

    const markers = screen.getAllByTestId('slider-marker')

    expect(markers).toHaveLength(3)

    markers.forEach((marker, index) => {
      expect(marker.getAttribute('data-value')).toBe(`${marks[index]}`)
    })
  })

  it('should pass rest props to ChakraSlider.Root', () => {
    render(
      <ChakraProvider>
        <Slider orientation='vertical' />
      </ChakraProvider>
    )

    expect(screen.getByRole('slider')).toHaveAttribute('data-orientation', 'vertical')
  })
})
