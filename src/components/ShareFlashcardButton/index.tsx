import { BsFillShareFill } from 'react-icons/bs'
import { TableButton } from '$/components/TableButton'
import { updateFlashcard } from '$/query/flashcards'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@chakra-ui/react'
import { FlashcardType } from '$/types'

type Props = {
  shared: boolean
  id: string
}

function ShareFlashcardButton({ shared, id }: Readonly<Props>) {
  const queryClient = useQueryClient()

  const shareMutation = useMutation({
    mutationFn: updateFlashcard(id),
    onSuccess: async updatedFlashcard => {
      const flashcards = await queryClient.ensureQueryData<FlashcardType[]>({
        queryKey: ['flashcards', { due: true, upcoming: true }]
      })

      const index = flashcards.findIndex(flashcard => flashcard.id === updatedFlashcard.id)

      const newFlashcards = [...flashcards]

      newFlashcards[index] = { ...newFlashcards[index], shared: updatedFlashcard.shared }

      queryClient.setQueryData(['flashcards', { due: true, upcoming: true }], newFlashcards)
    }
  })

  return (
    <TableButton
      label='Compartilhar'
      colorPalette='orange'
      variant={shareMutation.isPending || !shared ? 'outline' : 'solid'}
      disabled={shareMutation.isPending}
      onClick={() => shareMutation.mutate({ shared: !shared })}
    >
      {shareMutation.isPending ? (
        <Spinner size='inherit' color='inherit' data-testid='spinner' />
      ) : (
        <BsFillShareFill />
      )}
    </TableButton>
  )
}

export { ShareFlashcardButton }
