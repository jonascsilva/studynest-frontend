import {
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react'
import { createLazyFileRoute } from '@tanstack/react-router'

import classes from './index.module.scss'

export const Route = createLazyFileRoute('/(dashboard)/_dashboard/settings/')({
  component: Index
})

function Index() {
  return (
    <div className={classes.container}>
      <Heading size='2xl'>Configurações</Heading>
      <section className={classes.section}>
        <div>
          <Text fontSize='3xl'>Quantidade de intervalos:</Text>
          <Slider aria-label='slider-settings-1' min={2} max={6} defaultValue={5}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
        <div>
          <Text fontSize='3xl'>Intervalo base:</Text>
          <Slider aria-label='slider-settings-2' min={1} max={6} defaultValue={2}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
        <div>
          <Text fontSize='3xl'>Aumento dos intervalos:</Text>
          <Slider aria-label='slider-settings-3' min={1} max={4} defaultValue={2}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
      </section>
    </div>
  )
}
