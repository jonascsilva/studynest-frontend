import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Deck } from '$/types'

import classes from './index.module.scss'
import { AddIcon } from '@chakra-ui/icons'

export const Route = createLazyFileRoute('/(dashboard)/_dashboard/decks/')({
  component: Index
})

function Index() {
  const {
    isPending,
    error,
    data: decks
  } = useQuery<Deck[]>({
    queryKey: ['decks'],
    queryFn: () => fetch('http://localhost:3000/decks').then(res => res.json())
  })

  if (isPending) {
    return (
      <Center h='100%'>
        <Spinner size='xl' />
      </Center>
    )
  }

  if (error || !Array.isArray(decks)) {
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
        <Heading size='2xl'>Baralhos</Heading>
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
            </Tr>
          </Thead>
          <Tbody>
            {decks.map(deck => (
              <Tr>
                <Td>{deck.title}</Td>
                <Td>{deck.subject}</Td>
                <Td>{deck.updatedAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
