import { Heading, Text, Stack } from '@chakra-ui/react'
import { Slider } from '$/components/ui/slider'
import { createFileRoute } from '@tanstack/react-router'

import classes from './index.module.scss'
import { Button } from '$/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { updateUserSettings } from '$/query/settings'
import { settingsQueryOptions } from '$/query/settingsOptions'

type Inputs = {
  intervalsQuantity: number
  baseInterval: number
  intervalIncreaseRate: number
}

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard/settings/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(settingsQueryOptions()),
  component: Component
})

function Component() {
  const { data: settings } = useSuspenseQuery(settingsQueryOptions())
  const queryClient = useQueryClient()
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const intervalsQuantity = watch('intervalsQuantity', settings.intervalsQuantity)
  const baseInterval = watch('baseInterval', settings.baseInterval)
  const intervalIncreaseRate = watch('intervalIncreaseRate', settings.intervalIncreaseRate)

  const mutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: data => {
      queryClient.setQueryData(['settings'], data)
    }
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.container}>
        <Heading size='4xl'>Configurações</Heading>
        <section className={classes.section}>
          <Stack gap='6'>
            <Text fontSize='3xl'>
              Quantidade de intervalos: <span className={classes.value}>{intervalsQuantity}</span>
            </Text>
            <Slider
              disabled={mutation.isPending}
              size='lg'
              aria-label={['slider-settings-1']}
              colorPalette='blue'
              defaultValue={[settings.intervalsQuantity]}
              marks={[2, 3, 4, 5, 6]}
              {...register('intervalsQuantity', {
                valueAsNumber: true
              })}
              min={2}
              max={6}
            />
          </Stack>
          <Stack gap='6'>
            <Text fontSize='3xl'>
              Intervalo base: <span className={classes.value}>{baseInterval}</span>
            </Text>
            <Slider
              disabled={mutation.isPending}
              size='lg'
              aria-label={['slider-settings-2']}
              colorPalette='blue'
              defaultValue={[settings.baseInterval]}
              marks={[2, 3, 4, 5, 6]}
              {...register('baseInterval', { valueAsNumber: true })}
              min={2}
              max={6}
            />
          </Stack>
          <Stack gap='6'>
            <Text fontSize='3xl'>
              Aumento dos intervalos: <span className={classes.value}>{intervalIncreaseRate}</span>
            </Text>
            <Slider
              disabled={mutation.isPending}
              size='lg'
              aria-label={['slider-settings-3']}
              colorPalette='blue'
              defaultValue={[settings.intervalIncreaseRate]}
              marks={[1, 2, 3, 4]}
              {...register('intervalIncreaseRate', { valueAsNumber: true })}
              min={1}
              max={4}
            />
          </Stack>
          <Button colorPalette='green' w='6rem' type='submit' loading={mutation.isPending}>
            Salvar
          </Button>
        </section>
      </div>
    </form>
  )
}

export { Route, Component }