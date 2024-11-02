import { Heading, Text, Stack } from '@chakra-ui/react'
import { Slider } from '$/components/ui/slider'
import { createLazyFileRoute } from '@tanstack/react-router'

import classes from './index.module.scss'

const Route = createLazyFileRoute('/(protected)/_protected/(dashboard)/_dashboard/settings/')({
  component: Component
})

function Component() {
  return (
    <div className={classes.container}>
      <Heading size='2xl'>Configurações</Heading>
      <section className={classes.section}>
        <Stack gap='6'>
          <Text fontSize='3xl'>Quantidade de intervalos:</Text>
          <Slider
            size='lg'
            aria-label={['slider-settings-1']}
            colorPalette='blue'
            min={2}
            max={6}
            defaultValue={[5]}
            marks={[2, 3, 4, 5, 6]}
          />
        </Stack>
        <Stack gap='6'>
          <Text fontSize='3xl'>Intervalo base:</Text>
          <Slider
            size='lg'
            aria-label={['slider-settings-2']}
            colorPalette='blue'
            min={1}
            max={6}
            defaultValue={[2]}
            marks={[1, 2, 3, 4, 5, 6]}
          />
        </Stack>
        <Stack gap='6'>
          <Text fontSize='3xl'>Aumento dos intervalos:</Text>
          <Slider
            size='lg'
            aria-label={['slider-settings-3']}
            colorPalette='blue'
            min={1}
            max={4}
            defaultValue={[2]}
            marks={[1, 2, 3, 4]}
          />
        </Stack>
      </section>
    </div>
  )
}

export { Route, Component }
