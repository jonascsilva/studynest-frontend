import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  AlertIcon,
  Center,
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
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Assunto</Th>
              <Th>Última modificação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notes.map(note => (
              <Tr key={note.id}>
                <Td>{note.title}</Td>
                <Td>{note.subject}</Td>
                <Td>{note.updatedAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}