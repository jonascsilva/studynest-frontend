import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { Textarea, Heading, Input } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NoteType } from '$/types'
import { Link } from '@tanstack/react-router'
import classes from './index.module.scss'
import { CloseButton } from '$/components/ui/close-button'
import { BsStars } from 'react-icons/bs'
import { generateNote } from '$/query/notes'

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
  const { register, handleSubmit, getValues, setValue, formState, reset } = useForm<Inputs>({
    defaultValues: {
      title: note?.title ?? '',
      subject: note?.subject ?? '',
      content: note?.content ?? ''
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await mutation.mutateAsync(data)

    reset(data)
  }

  const aiMutation = useMutation({
    mutationFn: generateNote,
    onSuccess: data => {
      setValue('content', data.content, { shouldDirty: true })
    }
  })

  const handleClick = () => {
    const values = getValues(['subject', 'title'])

    const data = {
      subject: values[0],
      title: values[1]
    }

    aiMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <header className={classes.header}>
        <div className={classes.leftContent}>
          <Link to='/notes'>
            <CloseButton
              disabled={mutation.isPending || aiMutation.isPending}
              size={{ base: 'sm', lg: 'md', xl: 'lg' }}
              variant='solid'
            />
          </Link>
          {formState.isDirty && (
            <Button
              loading={mutation.isPending}
              disabled={aiMutation.isPending}
              colorPalette='green'
              type='submit'
              size={{ base: 'sm', lg: 'md', xl: 'lg' }}
            >
              Salvar
            </Button>
          )}
        </div>
        <Heading size='3xl' justifySelf='center'>
          {note ? 'Editar' : 'Criar'}
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
          disabled={mutation.isPending || aiMutation.isPending}
          required
          {...register('subject', { required: true })}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size={{ base: 'xl', lg: '2xl' }}>Título</Heading>
        </div>
        <Input
          w='100%'
          size={{ base: 'lg', lg: 'xl' }}
          variant='subtle'
          resize='none'
          flexGrow='1'
          disabled={mutation.isPending || aiMutation.isPending}
          required
          {...register('title', { required: true })}
        />
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.labelContainer}>
          <Heading size={{ base: 'xl', lg: '2xl' }}>Conteúdo</Heading>
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
          size={{ base: 'lg', lg: 'xl' }}
          resize='none'
          flexGrow='1'
          variant='subtle'
          disabled={mutation.isPending || aiMutation.isPending}
          required
          {...register('content', { required: true })}
        />
      </div>
    </form>
  )
}

export { Note }
