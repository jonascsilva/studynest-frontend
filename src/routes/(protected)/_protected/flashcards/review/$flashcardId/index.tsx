import { createFileRoute } from '@tanstack/react-router'
import { flashcardQueryOptions } from '$/query/flashcardsOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button, Card, CardBody, Heading, Skeleton, Text } from '@chakra-ui/react'

import classes from './index.module.scss'
import { useState } from 'react'

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
      <Card width='100%'>
        <CardBody>
          <Heading textAlign='center' p='1.5rem' size='xl'>
            {flashcard.question}
          </Heading>
        </CardBody>
      </Card>
      <Card width='100%' maxHeight='50%'>
        <CardBody position='relative'>
          <Skeleton startColor='gray.600' endColor='gray.600' isLoaded={isRevealed}>
            <Text textAlign='center' p='1.5rem' fontSize='3xl'>
              {flashcard.answer}
            </Text>
          </Skeleton>
          {!isRevealed && (
            <div className={classes.buttonContainer}>
              <Button colorScheme='blue' onClick={() => setIsRevealed(true)}>
                Revelar
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
      {isRevealed && (
        <div className={classes.containerResult}>
          <Button size='lg' w='16rem' h='4rem' colorScheme='red'>
            Não lembrei
          </Button>
          <Button size='lg' w='16rem' h='4rem' colorScheme='green'>
            Lembrei
          </Button>
        </div>
      )}
    </div>
  )
}

export { Route, Component }
