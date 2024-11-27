import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLayoutEffect } from 'react'
import { Input, VStack, Text, Link, Card } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { Field } from '$/components/ui/field'
import { Button } from '$/components/ui/button'
import { PasswordInput } from '$/components/ui/password-input'
import { useAuth } from '$/hooks/useAuth'

import classes from './index.module.scss'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(6, { message: 'Mínimo de 6 caracteres' })
})

type FormSchema = z.infer<typeof schema>

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
  } = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/home', replace: true })
    }
  }, [isAuthenticated, navigate])

  const mutation = useMutation({
    mutationFn: signin
  })

  const onSubmit = (data: FormSchema) => {
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
                <Input type='email' placeholder='Digite seu email' {...register('email')} />
              </Field>
              <Field label='Senha' invalid={!!errors.password} errorText={errors.password?.message}>
                <PasswordInput placeholder='Digite sua senha' {...register('password')} />
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
