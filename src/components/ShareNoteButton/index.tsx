import { BsFillShareFill } from 'react-icons/bs'
import { TableButton } from '$/components/TableButton'
import { updateNote } from '$/query/notes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@chakra-ui/react'
import { NoteType } from '$/types'

type Props = {
  shared: boolean
  id: string
}

function ShareNoteButton({ shared, id }: Readonly<Props>) {
  const queryClient = useQueryClient()

  const shareMutation = useMutation({
    mutationFn: updateNote(id),
    onSuccess: async updatedNote => {
      const notes = await queryClient.ensureQueryData<NoteType[]>({ queryKey: ['notes'] })

      const index = notes.findIndex(note => note.id === updatedNote.id)

      const newNotes = [...notes]

      newNotes[index] = { ...newNotes[index], shared: updatedNote.shared }

      queryClient.setQueryData(['notes'], newNotes)
    }
  })

  return (
    <TableButton
      label='Compartilhar'
      colorPalette='orange'
      variant={shared ? 'solid' : 'outline'}
      disabled={shareMutation.isPending}
      onClick={() => shareMutation.mutate({ shared: !shared })}
    >
      {shareMutation.isPending ? (
        <Spinner size='inherit' color='inherit' data-testid='spinner' />
      ) : (
        <BsFillShareFill />
      )}
    </TableButton>
  )
}

export { ShareNoteButton }
