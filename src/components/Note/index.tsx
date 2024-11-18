import { UseMutationResult } from '@tanstack/react-query'
import { Textarea, Heading, Input } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NoteType } from '$/types'
import { Link } from '@tanstack/react-router'
import classes from './index.module.scss'
import { CloseButton } from '$/components/ui/close-button'
import { BsStars } from 'react-icons/bs'

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
          <Link to='/notes'>
            <CloseButton disabled={mutation.isPending} size='lg' variant='solid' />
          </Link>
          <Button loading={mutation.isPending} colorPalette='green' type='submit' size='lg'>
            Salvar
          </Button>
        </div>
        <Heading size='3xl' justifySelf='center'>
          {note ? 'Editar' : 'Criar'}
        </Heading>
      </header>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size='xl'>Assunto</Heading>
        </div>
        <Input
          w='20%'
          size='xl'
          variant='subtle'
          defaultValue={note?.subject}
          {...register('subject')}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size='2xl'>Título</Heading>
        </div>
        <Textarea
          px='1rem'
          size='xl'
          fontSize='xl'
          lineHeight='1.6'
          resize='none'
          flexGrow='1'
          variant='subtle'
          defaultValue={note?.title}
          {...register('title')}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size='2xl'>Conteúdo</Heading>
          <Button colorPalette='blue' size='sm'>
            <BsStars /> Gerar
          </Button>
        </div>
        <Textarea
          size='xl'
          resize='none'
          flexGrow='1'
          variant='subtle'
          defaultValue={note?.content}
          {...register('content')}
        />
      </div>
    </form>
  )
}

export { Note }
