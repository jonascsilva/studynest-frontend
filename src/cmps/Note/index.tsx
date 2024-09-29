import { UseMutationResult } from '@tanstack/react-query'
import { Button, Textarea, Input } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NoteType } from '$/query/notes'
import { Link } from '@tanstack/react-router'

type Inputs = {
  title: string
  subject: string
  content: string
}

type Props = {
  mutation: UseMutationResult<NoteType, Error, Partial<NoteType>, unknown>
  note?: NoteType
}

const Note = ({ mutation, note }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input defaultValue={note?.title} {...register('title')} />
      <Input defaultValue={note?.subject} {...register('subject')} />
      <Textarea defaultValue={note?.content} {...register('content')} />
      <Button isLoading={mutation.isPending} colorScheme='blue' type='submit'>
        Salvar
      </Button>
      <Link to='..'>
        <Button isDisabled={mutation.isPending}>Voltar</Button>
      </Link>
    </form>
  )
}

export { Note }
