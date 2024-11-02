import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Input, VStack, Text, Link, Card } from '@chakra-ui/react'
import { Field } from '$/components/ui/field'
import { Button } from '$/components/ui/button'
import { PasswordInput } from '$/components/ui/password-input'
import { useMutation } from '@tanstack/react-query'

import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'

type FormData = {
  email: string
  password: string
}

const Route = createFileRoute('/(auth)/signin/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/home' })
    }
  },
  component: Component
})

function Component() {
  const auth = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  const mutation = useMutation({
    mutationFn: auth.login
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <div className={classes.container}>
      <Card.Root w='25%'>
        <Card.Header>
          <Card.Title fontSize='xl'>Entrar</Card.Title>
        </Card.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <VStack gap='4'>
              <Field label='Email' invalid={!!errors.email} errorText={errors.email?.message}>
                <Input
                  type='email'
                  placeholder='Digite seu email'
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Endereço de email inválido'
                    }
                  })}
                />
              </Field>
              <Field label='Senha' invalid={!!errors.password} errorText={errors.password?.message}>
                <PasswordInput
                  placeholder='Digite sua senha'
                  {...register('password', {
                    required: 'Senha é obrigatória',
                    minLength: { value: 6, message: 'O comprimento mínimo é 6' }
                  })}
                />
              </Field>
            </VStack>
          </Card.Body>
          <Card.Footer>
            <VStack gap='4' w='100%'>
              <Button
                w='100%'
                colorPalette='blue'
                loading={isSubmitting}
                type='submit'
                width='100%'
              >
                Entrar
              </Button>
              <Text>
                Não tem uma conta?{' '}
                <Link color='blue.500' href='/signup'>
                  Cadastre-se
                </Link>
              </Text>
            </VStack>
          </Card.Footer>
        </form>
      </Card.Root>
    </div>
  )
}

export { Route, Component }
