import { createFileRoute } from '@tanstack/react-router'
import { Button, Editable, EditableInput, EditablePreview, Textarea } from '@chakra-ui/react'
import { noteQueryOptions } from '$/query/notesOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/(edit)/notes/$noteId/')({
  loader: ({ context: { queryClient }, params: { noteId } }) => {
    return queryClient.ensureQueryData(noteQueryOptions(noteId))
  },
  component: Index
})

function Index() {
  const { noteId } = Route.useParams()
  const { data: note } = useSuspenseQuery(noteQueryOptions(noteId))

  return (
    <>
      <Editable defaultValue={note.title}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Textarea defaultValue={note.content} />
      <Button colorScheme='blue'>Salvar</Button>
    </>
  )
}
