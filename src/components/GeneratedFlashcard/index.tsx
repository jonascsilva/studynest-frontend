import { Card } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import { FlashcardType } from '$/types'
import { useMutation } from '@tanstack/react-query'
import { createFlashcard } from '$/query/flashcards'

type Props = { flashcard: FlashcardType }

function GeneratedFlashcard({ flashcard }: Readonly<Props>) {
  const mutation = useMutation({
    mutationFn: createFlashcard
  })

  const handleClick = () => {
    mutation.mutate(flashcard)
  }

  return (
    <Card.Root>
      <Card.Body gap='2'>
        <Card.Title mb='2'>{flashcard.question}</Card.Title>
        <Card.Description>{flashcard.answer}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <Button
          colorPalette='green'
          disabled={mutation.isSuccess}
          onClick={handleClick}
          loading={mutation.isPending}
          size={{ base: 'sm', lg: 'md' }}
        >
          {mutation.isSuccess ? 'Salvo' : 'Salvar'}
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

export { GeneratedFlashcard }
