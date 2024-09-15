import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

export const Route = createLazyFileRoute('/_dashboard/notes/')({
  component: Index
})

function Index() {
  const {
    isPending,
    error,
    data: notes
  } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetch('http://localhost:3000/notes').then(res => res.json())
  })

  console.log(notes)

  if (isPending) return <div>Loading...</div>

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
              <Tr>
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
