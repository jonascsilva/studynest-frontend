import { createLazyFileRoute } from '@tanstack/react-router'
import { Button, Editable, EditableInput, EditablePreview, Textarea } from '@chakra-ui/react'

export const Route = createLazyFileRoute('/(edit)/notes/$noteId/')({
  component: Index
})

function Index() {
  const { noteId } = Route.useParams()

  return (
    <>
      <Editable defaultValue='Take some chakra'>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Textarea />
      <Button colorScheme='blue'>Salvar</Button>
    </>
  )
}
