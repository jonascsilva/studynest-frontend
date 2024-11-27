import { Slider as ChakraSlider } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface SliderProps extends ChakraSlider.RootProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
  label?: React.ReactNode
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(props, ref) {
  const { marks: marksProp, label, ...rest } = props
  const value = props.defaultValue ?? props.value

  const marks = marksProp?.map(mark => {
    if (typeof mark === 'number') return { value: mark, label: undefined }

    return mark
  })

  const hasMarkLabel = !!marks?.some(mark => mark.label)

  return (
    <ChakraSlider.Root ref={ref} data-testid='slider' thumbAlignment='center' {...rest}>
      {label && (
        <ChakraSlider.Label data-testid='slider-label' fontWeight='medium'>
          {label}
        </ChakraSlider.Label>
      )}
      <ChakraSlider.Control data-testid='slider-control' mb={hasMarkLabel ? '4' : undefined}>
        <ChakraSlider.Track>
          <ChakraSlider.Range />
        </ChakraSlider.Track>
        {value?.map((_, index) => (
          <ChakraSlider.Thumb data-testid='slider-thumb' key={index} index={index}>
            <ChakraSlider.HiddenInput data-testid='slider-hidden-input' />
          </ChakraSlider.Thumb>
        ))}
      </ChakraSlider.Control>
      {marks?.length && (
        <ChakraSlider.MarkerGroup data-testid='slider-marker-group'>
          {marks.map((mark, index) => {
            return (
              <ChakraSlider.Marker data-testid='slider-marker' key={index} value={mark.value}>
                <ChakraSlider.MarkerIndicator data-testid='slider-marker-indicator' />
                {mark.label}
              </ChakraSlider.Marker>
            )
          })}
        </ChakraSlider.MarkerGroup>
      )}
    </ChakraSlider.Root>
  )
})
