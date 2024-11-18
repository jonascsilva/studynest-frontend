import { useState } from 'react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { Skeleton } from '$/components/ui/skeleton'
import { Alert } from '$/components/ui/alert'

import classes from './index.module.scss'
import { FlashcardType, FlashcardWithRevisionType, ReviewResult } from '$/types'
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '$/components/ui/button'
import { CloseButton } from '$/components/ui/close-button'
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from '$/components/ui/dialog'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'

type Props = {
  flashcard: FlashcardType
  mutation?: UseMutationResult<FlashcardWithRevisionType, Error, ReviewResult, unknown>
}

function FlashcardReview({ flashcard, mutation }: Props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isRevealed, setIsRevealed] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [nextReviewDate, setNextReviewDate] = useState('')

  const handleResult = async (result: number) => {
    if (mutation) {
      const data = { result }

      const flashcardWithRevision = await mutation.mutateAsync(data)

      const nextReviewDate = new Date(flashcardWithRevision.nextReviewDate).toLocaleString('pt-BR')

      setNextReviewDate(nextReviewDate)
      setOpenDialog(true)
    } else {
      navigate({ to: '/flashcards' })
    }
  }

  const handleDialogClose = async () => {
    const dueFlashcards = await queryClient.ensureQueryData(flashcardsQueryOptions({ due: true }))

    setIsRevealed(false)
    setOpenDialog(false)

    const nextFlashcard = dueFlashcards.at(0)

    if (nextFlashcard) {
      navigate({
        to: '/flashcards/review/$flashcardId',
        params: { flashcardId: nextFlashcard.id },
        replace: true
      })
    } else {
      navigate({ to: '/home', replace: true })
    }
  }

  return (
    <>
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
      <DialogRoot lazyMount open={openDialog} placement='center' data-testid='dialog-root'>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Próxima revisão:</DialogTitle>
          </DialogHeader>
          <DialogBody>{nextReviewDate}</DialogBody>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export { FlashcardReview }
