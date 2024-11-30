import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Flex, Heading, Table } from '@chakra-ui/react'
import { BsPlusLg, BsPencilFill, BsFillTrash3Fill, BsArrowRepeat } from 'react-icons/bs'
import { flashcardsQueryOptions } from '$/query/flashcardsOptions'
import { deleteFlashcard } from '$/query/flashcards'
import { Button } from '$/components/ui/button'

import classes from './index.module.scss'
import { TableButton } from '$/components/TableButton'
import { getFormattedDate } from '$/lib/datetime'
import { ShareFlashcardButton } from '$/components/ShareFlashcardButton'
import { TextCell } from '$/components/TextCell'

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
          <Button colorPalette='blue' size={{ base: 'sm', lg: 'md', xl: 'lg' }}>
            <BsPlusLg /> Criar
          </Button>
        </Link>
      </header>
      <section className={classes.section}>
        <Table.ScrollArea borderWidth='1px' rounded='md' maxH='100%' overflowX='hidden'>
          <Table.Root size={{ base: 'sm', lg: 'lg' }} variant='outline' stickyHeader interactive>
            <colgroup>
              <col width='40%' />
              <col width='20%' />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <Table.Header>
              <Table.Row bg='bg.subtle'>
                <Table.ColumnHeader>Pergunta</Table.ColumnHeader>
                <Table.ColumnHeader>Assunto</Table.ColumnHeader>
                <Table.ColumnHeader textAlign='center'>Última modificação</Table.ColumnHeader>
                <Table.ColumnHeader textAlign='center'>Próxima revisão</Table.ColumnHeader>
                <Table.ColumnHeader textAlign='center'>Nível</Table.ColumnHeader>
                <Table.ColumnHeader textAlign='center'>Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {flashcards.map(flashcard => (
                <Table.Row key={flashcard.id}>
                  <TextCell>{flashcard.question}</TextCell>
                  <TextCell>{flashcard.subject}</TextCell>
                  <TextCell truncate={false} align='center'>
                    {getFormattedDate(flashcard.updatedAt)}
                  </TextCell>
                  <TextCell truncate={false} align='center'>
                    {getFormattedDate(flashcard.nextReviewDate, true)}
                  </TextCell>
                  <TextCell truncate={false} align='center'>
                    {flashcard.currentLevel}
                  </TextCell>
                  <Table.Cell textAlign='center'>
                    <Flex gap='6' justifyContent='center'>
                      <Link
                        to='/flashcards/preview/$flashcardId'
                        params={{
                          flashcardId: flashcard.id
                        }}
                      >
                        <TableButton label='Preview' colorPalette='green'>
                          <BsArrowRepeat />
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
                      <ShareFlashcardButton shared={flashcard.shared} id={flashcard.id} />
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
