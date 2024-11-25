import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { Textarea, Heading, Input } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from '@tanstack/react-router'
import classes from './index.module.scss'
import { FlashcardType } from '$/types'
import { CloseButton } from '$/components/ui/close-button'
import { BsStars } from 'react-icons/bs'
import { generateFlashcard } from '$/query/flashcards'

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
  const { register, handleSubmit, getValues, setValue } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    mutation.mutate(data)
  }

  const aiMutation = useMutation({
    mutationFn: generateFlashcard,
    onSuccess: data => {
      setValue('answer', data.answer)
    }
  })

  const handleClick = () => {
    const values = getValues(['subject', 'question'])

    const data = {
      subject: values[0],
      question: values[1]
    }

    aiMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <header className={classes.header}>
        <div className={classes.leftContent}>
          <Link to='/flashcards'>
            <CloseButton
              disabled={mutation.isPending || aiMutation.isPending}
              size={{ base: 'sm', lg: 'md', xl: 'lg' }}
              variant='solid'
            />
          </Link>
          <Button
            loading={mutation.isPending}
            disabled={aiMutation.isPending}
            colorPalette='green'
            type='submit'
            size={{ base: 'sm', lg: 'md', xl: 'lg' }}
          >
            Salvar
          </Button>
        </div>
        <Heading size='3xl' justifySelf='center'>
          {flashcard ? 'Editar' : 'Criar'}
        </Heading>
      </header>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size={{ base: 'lg', lg: 'xl' }}>Assunto</Heading>
        </div>
        <Input
          w='30%'
          size={{ base: 'lg', lg: 'xl' }}
          variant='subtle'
          defaultValue={flashcard?.subject}
          disabled={mutation.isPending || aiMutation.isPending}
          required
          {...register('subject', { required: true })}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size={{ base: 'xl', lg: '2xl' }}>Pergunta</Heading>
        </div>
        <Textarea
          px='1rem'
          fontSize={{ base: 'lg', lg: 'xl' }}
          lineHeight='1.6'
          resize='none'
          flexGrow='1'
          variant='subtle'
          defaultValue={flashcard?.question}
          disabled={mutation.isPending || aiMutation.isPending}
          required
          {...register('question', { required: true })}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size={{ base: 'xl', lg: '2xl' }}>Resposta</Heading>
          <Button
            colorPalette='blue'
            size={{ base: 'xs', lg: 'sm' }}
            onClick={handleClick}
            loading={aiMutation.isPending}
          >
            <BsStars /> Gerar
          </Button>
        </div>
        <Textarea
          px='1rem'
          size='xl'
          fontSize={{ base: 'lg', lg: 'xl' }}
          lineHeight='1.6'
          resize='none'
          flexGrow='1'
          variant='subtle'
          defaultValue={flashcard?.answer}
          disabled={mutation.isPending || aiMutation.isPending}
          required
          {...register('answer', { required: true })}
        />
      </div>
    </form>
  )
}

export { Flashcard }
