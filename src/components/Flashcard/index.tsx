import { UseMutationResult } from '@tanstack/react-query'
import { Textarea, Heading, Input } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from '@tanstack/react-router'
import classes from './index.module.scss'
import { FlashcardType } from '$/types'
import { CloseButton } from '$/components/ui/close-button'
import { BsStars } from 'react-icons/bs'

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
          <Link to='/flashcards'>
            <CloseButton disabled={mutation.isPending} size='lg' variant='solid' />
          </Link>
          <Button loading={mutation.isPending} colorPalette='green' type='submit' size='lg'>
            Salvar
          </Button>
        </div>
        <Heading size='3xl' justifySelf='center'>
          {flashcard ? 'Editar' : 'Criar'}
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
          defaultValue={flashcard?.subject}
          {...register('subject')}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size='2xl'>Pergunta</Heading>
        </div>
        <Textarea
          px='1rem'
          fontSize='xl'
          lineHeight='1.6'
          resize='none'
          flexGrow='1'
          variant='subtle'
          defaultValue={flashcard?.question}
          {...register('question')}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size='2xl'>Resposta</Heading>
          <Button colorPalette='blue' size='sm'>
            <BsStars /> Gerar
          </Button>
        </div>
        <Textarea
          px='1rem'
          size='xl'
          fontSize='xl'
          lineHeight='1.6'
          resize='none'
          flexGrow='1'
          variant='subtle'
          defaultValue={flashcard?.answer}
          {...register('answer')}
        />
      </div>
    </form>
  )
}

export { Flashcard }
