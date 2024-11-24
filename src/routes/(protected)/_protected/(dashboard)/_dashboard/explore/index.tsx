import { Button } from '$/components/ui/button'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { Heading, Input, Tabs } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import classes from './index.module.scss'
import { z } from 'zod'
import { BsCardText, BsFileEarmarkText, BsSearch } from 'react-icons/bs'
import { notesQueryOptions } from '$/query/notesOptions'
import { ExploreFlashcards } from '$/components/ExploreFlashcards'
import { ExploreNotes } from '$/components/ExploreNotes'
import { useSuspenseQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  query: string
}

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard/explore/')({
  validateSearch: z.object({
    query: z.string().trim().optional().catch('')
  }),
  loaderDeps: ({ search: { query } }) => ({ query }),
  loader: ({ context: { queryClient }, deps: { query } }) => {
    queryClient.ensureQueryData(flashcardsQueryOptions({ shared: true, query }))
    queryClient.ensureQueryData(notesQueryOptions({ shared: true, query }))
  },
  component: RouteComponent
})

function RouteComponent() {
  const { query } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: flashcards } = useSuspenseQuery(flashcardsQueryOptions({ shared: true, query }))
  const { data: notes } = useSuspenseQuery(notesQueryOptions({ shared: true, query }))
  const { register, handleSubmit } = useForm<Inputs>({ defaultValues: { query } })

  const onSubmit: SubmitHandler<Inputs> = data => {
    navigate({
      to: '.',
      search: data
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <header className={classes.header}>
        <Heading size='4xl'>Flashcards</Heading>
        <Input
          size='xl'
          placeholder='O que deseja pesquisar?'
          variant='flushed'
          alignSelf='flex-end'
          {...register('query')}
        />
        <Button colorPalette='blue' size='lg' type='submit'>
          <BsSearch /> Pesquisar
        </Button>
      </header>
      <Tabs.Root
        defaultValue='flashcards'
        fitted
        lazyMount
        unmountOnExit
        variant='enclosed'
        px='3rem'
        pb='2rem'
        display='grid'
        gridTemplateRows='auto minmax(0, 1fr)'
      >
        <Tabs.List>
          <Tabs.Trigger value='flashcards'>
            <BsCardText />
            Flashcards
          </Tabs.Trigger>
          <Tabs.Trigger value='notes'>
            <BsFileEarmarkText />
            Anotações
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='flashcards'>
          <ExploreFlashcards flashcards={flashcards} />
        </Tabs.Content>
        <Tabs.Content value='notes'>
          <ExploreNotes notes={notes} />
        </Tabs.Content>
      </Tabs.Root>
    </form>
  )
}

export { Route, RouteComponent }
