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

function getDaysFromNow(date: string) {
  const date1Ms = Date.now()
  const date2Ms = new Date(date).getTime()

  const differenceMs = Math.abs(date1Ms - date2Ms)

  const differenceDays = Math.round(differenceMs / (1000 * 60 * 60 * 24))

  return differenceDays
}

type Props = {
  flashcard: FlashcardType
  mutation?: UseMutationResult<FlashcardWithRevisionType, Error, ReviewResult, unknown>
}

function FlashcardReview({ flashcard, mutation }: Readonly<Props>) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isRevealed, setIsRevealed] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [nextReviewDate, setNextReviewDate] = useState('')

  const handleResult = async (result: number) => {
    const data = { result }

    const flashcardWithRevision = await mutation!.mutateAsync(data)

    setNextReviewDate(flashcardWithRevision.nextReviewDate)
    setOpenDialog(true)
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
              <CloseButton size={{ base: 'md', lg: 'xl' }} variant='solid' />
            </Link>
          </div>
          {!mutation && (
            <div className={classes.alertContainer}>
              <Alert
                status='warning'
                title='Você está no modo Preview. O resultado desta revisão não será salvo!'
                size={{ base: 'sm', lg: 'lg' }}
                variant='surface'
                w='auto'
              />
            </div>
          )}
        </header>
        <main className={classes.main}>
          <Card.Root>
            <Card.Body justifyContent='center'>
              <Heading textAlign='center' size='2xl' lineClamp={2}>
                {flashcard.question}
              </Heading>
            </Card.Body>
          </Card.Root>
          <Card.Root h='16rem'>
            <Card.Body justifyContent='center'>
              {!isRevealed ? (
                <Skeleton variant='none' loading />
              ) : (
                <Text textAlign='center' fontSize='xl' lineClamp={7}>
                  {flashcard.answer}
                </Text>
              )}
              {!isRevealed && (
                <div className={classes.buttonContainer}>
                  <Button
                    size={{ base: 'lg', lg: 'xl' }}
                    colorPalette='blue'
                    onClick={() => setIsRevealed(true)}
                  >
                    Revelar
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card.Root>
          <div className={classes.containerResult}>
            {isRevealed && mutation && (
              <>
                <Button
                  size={{ base: 'md', lg: 'lg' }}
                  w={{ base: '12rem', lg: '16rem' }}
                  h={{ base: '3rem', lg: '4rem' }}
                  colorPalette='red'
                  onClick={() => handleResult(0)}
                  loading={mutation?.isPending}
                >
                  Não lembrei
                </Button>
                <Button
                  size={{ base: 'md', lg: 'lg' }}
                  w={{ base: '12rem', lg: '16rem' }}
                  h={{ base: '3rem', lg: '4rem' }}
                  colorPalette='green'
                  onClick={() => handleResult(1)}
                  loading={mutation?.isPending}
                >
                  Lembrei
                </Button>
              </>
            )}
          </div>
        </main>
      </div>
      <DialogRoot lazyMount open={openDialog} placement='center' data-testid='dialog-root'>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Próxima revisão será daqui a{' '}
              <span className={classes.days}>{getDaysFromNow(nextReviewDate)}</span> dia(s).
            </DialogTitle>
          </DialogHeader>
          <DialogBody>{new Date(nextReviewDate).toLocaleString('pt-BR')}</DialogBody>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export { FlashcardReview }
