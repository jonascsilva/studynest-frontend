import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useLayoutEffect } from 'react'
import { Input, VStack, Text, Link, Card } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { Field } from '$/components/ui/field'
import { Button } from '$/components/ui/button'
import { PasswordInput } from '$/components/ui/password-input'
import { useAuth } from '$/hooks/useAuth'

import classes from './index.module.scss'

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
  const { signin, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/home', replace: true })
    }
  }, [isAuthenticated, navigate])

  const mutation = useMutation({
    mutationFn: signin
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <div className={classes.container}>
      <Card.Root w={{ base: '30%', lg: '25%' }}>
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
              <div className={classes.errorContainer}>
                <span>{mutation.error && 'Credenciais incorretas'}</span>
              </div>
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
