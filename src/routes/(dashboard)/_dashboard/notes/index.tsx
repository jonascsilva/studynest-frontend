import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import classes from './index.module.scss'
import { notesQueryOptions } from '$/query/notesOptions'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { deleteNote } from '$/query/notes'

const Route = createFileRoute('/(dashboard)/_dashboard/notes/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(notesQueryOptions),
  component: Component
})

function Component() {
  const { data: notes } = useSuspenseQuery(notesQueryOptions)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Heading size='2xl'>Anotações</Heading>
        <Link to='/notes/new'>
          <Button colorScheme='blue' size='lg' leftIcon={<AddIcon />}>
            Criar
          </Button>
        </Link>
      </header>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Assunto</Th>
              <Th>Última modificação</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {notes.map(note => (
              <Tr key={note.id}>
                <Td>{note.title}</Td>
                <Td>{note.subject}</Td>
                <Td>{note.updatedAt}</Td>
                <Td>
                  <Flex gap={10}>
                    <Link
                      to='/notes/$noteId'
                      params={{
                        noteId: note.id
                      }}
                    >
                      <IconButton aria-label='Editar' icon={<EditIcon />} />
                    </Link>
                    <IconButton aria-label='Editar' icon={<ExternalLinkIcon />} />
                    <IconButton
                      aria-label='Excluir'
                      icon={<DeleteIcon />}
                      onClick={() => mutation.mutate(note.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export { Route, Component }
