import { createFileRoute } from '@tanstack/react-router'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button, Card, Heading, Text } from '@chakra-ui/react'

import classes from './index.module.scss'
import { useState } from 'react'
import { Skeleton } from '$/components/ui/skeleton'

const Route = createFileRoute('/(protected)/_protected/flashcards/review/$flashcardId/')({
  loader: ({ context: { queryClient }, params: { flashcardId } }) => {
    return queryClient.ensureQueryData(flashcardQueryOptions(flashcardId))
  },
  component: Component
})

function Component() {
  const { flashcardId } = Route.useParams()
  const { data: flashcard } = useSuspenseQuery(flashcardQueryOptions(flashcardId))
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div className={classes.container}>
      <Card.Root width='100%' height='100%'>
        <Card.Body justifyContent='center'>
          <Heading textAlign='center' p='1.5rem' size='3xl'>
            {flashcard.question}
          </Heading>
        </Card.Body>
      </Card.Root>
      <Card.Root width='100%' height='100%'>
        <Card.Body justifyContent='center'>
          <Skeleton variant='none' loading={!isRevealed}>
            <Text textAlign='center' p='1.5rem' fontSize='xl' truncate>
              {flashcard.answer}
            </Text>
          </Skeleton>
          {!isRevealed && (
            <div className={classes.buttonContainer}>
              <Button size='lg' colorPalette='blue' onClick={() => setIsRevealed(true)}>
                Revelar
              </Button>
            </div>
          )}
        </Card.Body>
      </Card.Root>
      {isRevealed && (
        <div className={classes.containerResult}>
          <Button size='lg' w='16rem' h='4rem' colorPalette='red'>
            Não lembrei
          </Button>
          <Button size='lg' w='16rem' h='4rem' colorPalette='green'>
            Lembrei
          </Button>
        </div>
      )}
    </div>
  )
}

export { Route, Component }
