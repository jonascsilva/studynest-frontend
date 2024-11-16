import { useState } from 'react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { Skeleton } from '$/components/ui/skeleton'
import { Alert } from '$/components/ui/alert'

import classes from './index.module.scss'
import { FlashcardType, ReviewResult } from '$/types'
import { UseMutationResult } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '$/components/ui/button'
import { CloseButton } from '$/components/ui/close-button'

type Props = {
  flashcard: FlashcardType
  mutation?: UseMutationResult<void, Error, ReviewResult, unknown>
}

function FlashcardReview({ flashcard, mutation }: Props) {
  const navigate = useNavigate()
  const [isRevealed, setIsRevealed] = useState(false)

  const handleResult = async (result: number) => {
    if (mutation) {
      const data = { result }

      await mutation.mutateAsync(data)

      setIsRevealed(false)
    } else {
      navigate({ to: '/flashcards' })
    }
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.closeButtonContainer}>
          <Link to={mutation ? '/home' : '/flashcards'}>
            <CloseButton size='xl' variant='solid' />
          </Link>
        </div>
        {!mutation && (
          <div className={classes.alertContainer}>
            <Alert
              status='warning'
              title='Você está no modo Preview. O resultado desta revisão não será salvo!'
              size='lg'
              variant='surface'
              w='auto'
            />
          </div>
        )}
      </header>
      <main className={classes.main}>
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
            <Button
              size='lg'
              w='16rem'
              h='4rem'
              colorPalette='red'
              onClick={() => handleResult(0)}
              loading={mutation?.isPending}
            >
              Não lembrei
            </Button>
            <Button
              size='lg'
              w='16rem'
              h='4rem'
              colorPalette='green'
              onClick={() => handleResult(1)}
              loading={mutation?.isPending}
            >
              Lembrei
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export { FlashcardReview }
