import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
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

import classes from './index.module.scss'
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { deleteFlashcard } from '$/query/flashcards'

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard/flashcards/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(flashcardsQueryOptions),
  component: Component
})

function Component() {
  const { data: flashcards } = useSuspenseQuery(flashcardsQueryOptions)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteFlashcard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] })
    }
  })

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Heading size='2xl'>Flashcards</Heading>
        <Link to='/flashcards/new'>
          <Button colorScheme='blue' size='lg' leftIcon={<AddIcon />}>
            Criar
          </Button>
        </Link>
      </header>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Pergunta</Th>
              <Th>Assunto</Th>
              <Th>Última modificação</Th>
              {/* <Th>Próxima revisão</Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {flashcards.map(flashcard => (
              <Tr key={flashcard.id}>
                <Td>{flashcard.question}</Td>
                <Td>{flashcard.subject}</Td>
                <Td>{flashcard.updatedAt}</Td>
                <Td>
                  <Flex gap={10}>
                    <Link
                      to='/flashcards/$flashcardId'
                      params={{
                        flashcardId: flashcard.id
                      }}
                    >
                      <IconButton aria-label='Editar' icon={<EditIcon />} />
                    </Link>
                    <IconButton aria-label='Editar' icon={<ExternalLinkIcon />} />
                    <IconButton
                      aria-label='Excluir'
                      icon={<DeleteIcon />}
                      onClick={() => mutation.mutate(flashcard.id)}
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