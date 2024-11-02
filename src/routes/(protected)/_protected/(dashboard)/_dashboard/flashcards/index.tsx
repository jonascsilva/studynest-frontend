import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Flex, Heading, IconButton, Table, Text } from '@chakra-ui/react'
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
                  <Table.Cell>{flashcard.updatedAt}</Table.Cell>
                  <Table.Cell>???</Table.Cell>
                  <Table.Cell>
                    <Flex gap='6' justifyContent='center'>
                      <Link
                        to='/flashcards/review/$flashcardId'
                        params={{
                          flashcardId: flashcard.id
                        }}
                      >
                        <IconButton aria-label='Revisar' variant='surface' colorPalette='green'>
                          <BsEyeFill />
                        </IconButton>
                      </Link>
                      <Link
                        to='/flashcards/edit/$flashcardId'
                        params={{
                          flashcardId: flashcard.id
                        }}
                      >
                        <IconButton aria-label='Editar' variant='surface' colorPalette='yellow'>
                          <BsPencilFill />
                        </IconButton>
                      </Link>
                      <IconButton aria-label='Compartilhar' variant='surface' colorPalette='orange'>
                        <BsFillShareFill />
                      </IconButton>
                      <IconButton
                        variant='surface'
                        colorPalette='red'
                        aria-label='Excluir'
                        onClick={() => mutation.mutate(flashcard.id)}
                      >
                        <BsFillTrash3Fill />
                      </IconButton>
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
