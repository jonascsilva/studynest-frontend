import { Table, Text } from '@chakra-ui/react'
import { TableButton } from '../TableButton'
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
import { NoteType } from '$/types'
import { createNote } from '$/query/notes'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  notes: NoteType[]
}

function ExploreNotes({ notes }: Readonly<Props>) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [openNote, setOpenNote] = useState<NoteType | null>(null)

  const mutation = useMutation({
    mutationKey: ['createNote'],
    mutationFn: createNote,
    onSuccess: data => {
      queryClient.setQueryData(['notes', data.id], data)

      navigate({
        to: '/notes/edit/$noteId',
        params: { noteId: data.id }
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
              <Table.ColumnHeader>Título</Table.ColumnHeader>
              <Table.ColumnHeader>Assunto</Table.ColumnHeader>
              <Table.ColumnHeader textAlign='center'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {notes.map(note => (
              <Table.Row key={note.id}>
                <Table.Cell maxW='0'>
                  <Text truncate>{note.title}</Text>
                </Table.Cell>
                <Table.Cell>{note.subject}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <TableButton
                    label='Preview'
                    colorPalette='green'
                    onClick={() => setOpenNote(note)}
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
        open={!!openNote}
        placement='center'
        data-testid='dialog-root'
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openNote?.title}</DialogTitle>
          </DialogHeader>
          <DialogBody maxH='30rem' overflowY='auto'>
            {openNote?.content}
          </DialogBody>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenNote(null)}>
              Cancel
            </Button>
            <Button colorPalette='blue' onClick={() => mutation.mutate(openNote!)}>
              Copiar
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export { ExploreNotes }
