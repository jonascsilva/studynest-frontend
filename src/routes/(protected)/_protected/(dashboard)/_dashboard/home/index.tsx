import { createFileRoute, Link } from '@tanstack/react-router'
import { Heading } from '@chakra-ui/react'

import { useAuth } from '$/hooks/useAuth'
import { Alert } from '$/components/ui/alert'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'

import classes from './index.module.scss'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '$/components/ui/button'

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard/home/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(flashcardsQueryOptions({ due: true })),
  component: Component
})

function Component() {
  const { data: dueFlashcards } = useSuspenseQuery(flashcardsQueryOptions({ due: true }))
  const { user } = useAuth()

  const quantity = dueFlashcards.length

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Heading size='4xl' className={classes.heading}>
          Bem vindo <span>{user?.name ?? user?.email}</span>!
        </Heading>
      </div>
      <section className={classes.section}>
        {quantity ? (
          <>
            <Heading size='xl'>
              Você tem <span className={classes.quantity}>{quantity}</span> flashcards para revisar
            </Heading>
            <Link
              to='/flashcards/review/$flashcardId'
              params={{
                flashcardId: dueFlashcards[0].id
              }}
            >
              <Button size={{ base: 'md', lg: 'lg' }} variant='solid' colorPalette='green'>
                Começar revisão
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Alert status='success' title='Nada para revisar no momento.' w='auto' />
            <Link to='/flashcards/new'>
              <Button size={{ base: 'md', lg: 'lg' }} variant='solid' colorPalette='blue'>
                Criar Flashcard
              </Button>
            </Link>
          </>
        )}
      </section>
    </div>
  )
}

export { Route, Component }
