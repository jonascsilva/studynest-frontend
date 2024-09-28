import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Note } from '$/types'
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import classes from './index.module.scss'

export const Route = createLazyFileRoute('/(dashboard)/_dashboard/notes/')({
  component: Index
})

function Index() {
  const {
    isPending,
    error,
    data: notes
  } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: () => fetch('http://localhost:3000/notes').then(res => res.json())
  })

  if (isPending) {
    return (
      <Center h='100%'>
        <Spinner size='xl' />
      </Center>
    )
  }

  if (error || !Array.isArray(notes)) {
    return (
      <Alert status='error'>
        <AlertIcon />
        Houve um erro na requesição
      </Alert>
    )
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Heading size='2xl'>Anotações</Heading>
        <Button colorScheme='blue' size='lg' leftIcon={<AddIcon />}>
          Criar
        </Button>
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
                    <IconButton aria-label='Excluir' icon={<DeleteIcon />} />
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
