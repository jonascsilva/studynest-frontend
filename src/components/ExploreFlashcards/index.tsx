import { Table, Text } from '@chakra-ui/react'
import { TableButton } from '$/components/TableButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from '$/components/ui/dialog'
import { BsEyeFill } from 'react-icons/bs'
import { useState } from 'react'
import { Button } from '$/components/ui/button'
import { FlashcardType } from '$/types'
import { useNavigate } from '@tanstack/react-router'
import { createFlashcard } from '$/query/flashcards'

type Props = {
  flashcards: FlashcardType[]
}

function ExploreFlashcards({ flashcards }: Readonly<Props>) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [openFlashcard, setOpenFlashcard] = useState<FlashcardType | null>(null)

  const mutation = useMutation({
    mutationKey: ['createNote'],
    mutationFn: createFlashcard,
    onSuccess: data => {
      queryClient.setQueryData(['flashcards', data.id], data)

      navigate({
        to: '/flashcards/edit/$flashcardId',
        params: { flashcardId: data.id }
      })
    }
  })

  return (
    <>
      <Table.ScrollArea borderWidth='1px' rounded='md' maxH='100%' overflowX='hidden'>
        <Table.Root size='lg' variant='outline' stickyHeader interactive>
          <colgroup>
            <col width='40%' />
            <col />
            <col />
          </colgroup>
          <Table.Header>
            <Table.Row bg='bg.subtle'>
              <Table.ColumnHeader>Pergunta</Table.ColumnHeader>
              <Table.ColumnHeader>Assunto</Table.ColumnHeader>
              <Table.ColumnHeader textAlign='center'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {flashcards.map(flashcard => (
              <Table.Row key={flashcard.id}>
                <Table.Cell maxW='0'>
                  <Text truncate>{flashcard.question}</Text>
                </Table.Cell>
                <Table.Cell>{flashcard.subject}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <TableButton
                    label='Preview'
                    colorPalette='green'
                    onClick={() => setOpenFlashcard(flashcard)}
                  >
                    <BsEyeFill />
                  </TableButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <DialogRoot
        lazyMount
        size='lg'
        open={!!openFlashcard}
        placement='center'
        data-testid='dialog-root'
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openFlashcard?.question}</DialogTitle>
          </DialogHeader>
          <DialogBody maxH='30rem' overflowY='auto'>
            {openFlashcard?.answer}
          </DialogBody>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenFlashcard(null)}>
              Cancel
            </Button>
            <Button colorPalette='blue' onClick={() => mutation.mutate(openFlashcard!)}>
              Copiar
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export { ExploreFlashcards }
