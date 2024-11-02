import { UseMutationResult } from '@tanstack/react-query'
import { Textarea, Input } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NoteType } from '$/types'
import { Link } from '@tanstack/react-router'
import classes from './index.module.scss'

type Inputs = {
  title: string
  subject: string
  content: string
}

type Props = {
  mutation: UseMutationResult<NoteType, Error, Partial<NoteType>, unknown>
  note?: NoteType
}

function Note({ mutation, note }: Readonly<Props>) {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <header className={classes.header}>
        <div className={classes.leftContent}>
          <Input defaultValue={note?.title} {...register('title')} />
          <Input defaultValue={note?.subject} {...register('subject')} />
        </div>
        <div className={classes.rightContent}>
          <Button loading={mutation.isPending} colorPalette='green' type='submit'>
            Salvar
          </Button>
          <Link to='/notes'>
            <Button disabled={mutation.isPending} variant='outline'>
              Voltar
            </Button>
          </Link>
        </div>
      </header>
      <div className={classes.contentContainer}>
        <Textarea defaultValue={note?.content} {...register('content')} h='100%' />
      </div>
    </form>
  )
}

export { Note }
