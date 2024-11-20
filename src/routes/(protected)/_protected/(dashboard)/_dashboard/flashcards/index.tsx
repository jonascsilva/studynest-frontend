import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Flex, Heading, Table, Text } from '@chakra-ui/react'
import {
  BsPlusLg,
  BsPencilFill,
  BsFillTrash3Fill,
  BsFillShareFill,
  BsEyeFill
} from 'react-icons/bs'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { deleteFlashcard } from '$/query/flashcards'
import { Button } from '$/components/ui/button'

import classes from './index.module.scss'
import { TableButton } from '$/components/TableButton'
import { getFormattedDate } from '$/lib/datetime'

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard/flashcards/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(flashcardsQueryOptions({ due: true, upcoming: true })),
  component: Component
})

function Component() {
  const { data: flashcards } = useSuspenseQuery(
    flashcardsQueryOptions({ due: true, upcoming: true })
  )
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteFlashcard,
    onSuccess: deletedFlashcard => {
      const newFlashcards = flashcards.filter(flashcard => flashcard.id !== deletedFlashcard.id)

      queryClient.setQueryData(['flashcards', { due: true, upcoming: true }], newFlashcards)
    }
  })

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Heading size='4xl'>Flashcards</Heading>
        <Link to='/flashcards/new'>
          <Button colorPalette='blue' size='lg'>
            <BsPlusLg /> Criar
          </Button>
        </Link>
      </header>
      <section className={classes.section}>
        <Table.ScrollArea borderWidth='1px' rounded='md' maxH='100%' overflowX='hidden'>
          <Table.Root size='lg' variant='outline' stickyHeader interactive>
            <colgroup>
              <col width='40%' />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <Table.Header>
              <Table.Row bg='bg.subtle'>
                <Table.ColumnHeader>Pergunta</Table.ColumnHeader>
                <Table.ColumnHeader>Assunto</Table.ColumnHeader>
                <Table.ColumnHeader>Última modificação</Table.ColumnHeader>
                <Table.ColumnHeader>Próxima revisão</Table.ColumnHeader>
                <Table.ColumnHeader>Nível</Table.ColumnHeader>
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
                  <Table.Cell>{getFormattedDate(flashcard.updatedAt)}</Table.Cell>
                  <Table.Cell>{getFormattedDate(flashcard.nextReviewDate, true)}</Table.Cell>
                  <Table.Cell>{flashcard.currentLevel}</Table.Cell>
                  <Table.Cell>
                    <Flex gap='6' justifyContent='center'>
                      <Link
                        to='/flashcards/preview/$flashcardId'
                        params={{
                          flashcardId: flashcard.id
                        }}
                      >
                        <TableButton label='Preview' colorPalette='green'>
                          <BsEyeFill />
                        </TableButton>
                      </Link>
                      <Link
                        to='/flashcards/edit/$flashcardId'
                        params={{
                          flashcardId: flashcard.id
                        }}
                      >
                        <TableButton label='Editar' colorPalette='yellow'>
                          <BsPencilFill />
                        </TableButton>
                      </Link>
                      <TableButton label='Compartilhar' colorPalette='orange'>
                        <BsFillShareFill />
                      </TableButton>
                      <TableButton
                        label='Excluir'
                        colorPalette='red'
                        onClick={() => mutation.mutate(flashcard.id)}
                      >
                        <BsFillTrash3Fill />
                      </TableButton>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </section>
    </div>
  )
}

export { Route, Component }
