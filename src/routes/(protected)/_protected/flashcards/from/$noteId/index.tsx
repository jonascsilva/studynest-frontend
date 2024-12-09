import { noteQueryOptions } from '$/query/notesOptions'
import { Heading } from '@chakra-ui/react'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { generateFlashcards } from '$/query/flashcards'
import { Button } from '$/components/ui/button'
import { BsStars } from 'react-icons/bs'

import classes from './index.module.scss'
import { CloseButton } from '$/components/ui/close-button'
import { GeneratedFlashcard } from '$/components/GeneratedFlashcard'

const Route = createFileRoute('/(protected)/_protected/flashcards/from/$noteId/')({
  loader: ({ context: { queryClient }, params: { noteId } }) => {
    return queryClient.ensureQueryData(noteQueryOptions(noteId))
  },
  component: RouteComponent
})

function RouteComponent() {
  const { noteId } = Route.useParams()
  const { data: note } = useSuspenseQuery(noteQueryOptions(noteId))

  const generateMutation = useMutation({
    mutationFn: generateFlashcards
  })

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Link to='/notes'>
          <CloseButton disabled={generateMutation.isPending} size='lg' variant='solid' />
        </Link>
        <Heading size='3xl' justifySelf='center'>
          Gerar flashcards
        </Heading>
      </header>
      <section className={classes.section}>
        <Heading size={{ base: 'lg', lg: 'xl' }} justifySelf='center'>
          Deseja gerar flashcards com base no conteúdo da anotação: "{note.title}"?
        </Heading>
        <Button
          w='10%'
          colorPalette='blue'
          onClick={() => generateMutation.mutate(note.id)}
          loading={generateMutation.isPending}
          size={{ base: 'sm', lg: 'md' }}
        >
          <BsStars /> Gerar
        </Button>
      </section>
      <main className={classes.main}>
        {generateMutation.data?.map(flashcard => (
          <GeneratedFlashcard flashcard={flashcard} key={flashcard.question} />
        ))}
      </main>
    </div>
  )
}

export { Route, RouteComponent }
