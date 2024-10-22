import { UseMutationResult } from '@tanstack/react-query'
import { Button, Textarea, Input } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from '@tanstack/react-router'
import classes from './index.module.scss'
import { FlashcardType } from '$/types'

type Inputs = {
  question: string
  subject: string
  answer: string
}

type Props = {
  mutation: UseMutationResult<FlashcardType, Error, Partial<FlashcardType>, unknown>
  flashcard?: FlashcardType
}

function Flashcard({ mutation, flashcard }: Readonly<Props>) {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <header className={classes.header}>
        <div className={classes.leftContent}>
          <Input defaultValue={flashcard?.question} {...register('question')} />
          <Input defaultValue={flashcard?.subject} {...register('subject')} />
        </div>
        <div className={classes.rightContent}>
          <Button isLoading={mutation.isPending} colorScheme='blue' type='submit'>
            Salvar
          </Button>
          <Link to='..'>
            <Button isDisabled={mutation.isPending}>Voltar</Button>
          </Link>
        </div>
      </header>
      <div className={classes.contentContainer}>
        <Textarea defaultValue={flashcard?.answer} {...register('answer')} h='100%' />
      </div>
    </form>
  )
}

export { Flashcard }
