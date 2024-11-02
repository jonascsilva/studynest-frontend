import { Link, createFileRoute } from '@tanstack/react-router'
import { Flex, Heading, IconButton, Table, Text } from '@chakra-ui/react'
import { BsPlusLg, BsPencilFill, BsFillTrash3Fill, BsFillShareFill } from 'react-icons/bs'
import { notesQueryOptions } from '$/query/notesOptions'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { deleteNote } from '$/query/notes'
import { Button } from '$/components/ui/button'

import classes from './index.module.scss'

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard/notes/')({
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
        <Heading size='4xl'>Anotações</Heading>
        <Link to='/notes/new'>
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
                <Table.ColumnHeader>Título</Table.ColumnHeader>
                <Table.ColumnHeader>Assunto</Table.ColumnHeader>
                <Table.ColumnHeader>Última modificação</Table.ColumnHeader>
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
                  <Table.Cell>{note.updatedAt}</Table.Cell>
                  <Table.Cell>
                    <Flex gap='6' justifyContent='center'>
                      <Link
                        to='/notes/edit/$noteId'
                        params={{
                          noteId: note.id
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
                        aria-label='Excluir'
                        variant='surface'
                        colorPalette='red'
                        onClick={() => mutation.mutate(note.id)}
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
