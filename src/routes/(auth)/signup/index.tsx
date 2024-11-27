import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, VStack, Text, Link, Card } from '@chakra-ui/react'

import { Field } from '$/components/ui/field'
import { Button } from '$/components/ui/button'
import { PasswordInput } from '$/components/ui/password-input'

import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'
import { useLayoutEffect } from 'react'
import { useMutation } from '@tanstack/react-query'

const schema = z
  .object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z
      .string()
      .min(1, { message: 'Email é obrigatório' })
      .email({ message: 'Endereço de email inválido' }),
    password: z
      .string()
      .min(1, { message: 'Senha é obrigatória' })
      .min(6, { message: 'Mínimo de 6 caracteres' }),
    confirmPassword: z.string().min(1, { message: 'Confirmação de senha é obrigatória' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword']
  })

type FormSchema = z.infer<typeof schema>

const Route = createFileRoute('/(auth)/signup/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/home' })
    }
  },
  component: Component
})

function Component() {
  const { signup, isAuthenticated } = useAuth()
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
    mutationFn: signup
  })

  const onSubmit = (data: FormSchema) => {
    mutation.mutate(data)
  }

  return (
    <div className={classes.container}>
      <Card.Root w={{ base: '30%', lg: '25%' }}>
        <Card.Header>
          <Card.Title fontSize='xl'>Cadastre-se</Card.Title>
        </Card.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <VStack gap='4'>
              <Field label='Nome' invalid={!!errors.name} errorText={errors.name?.message}>
                <Input type='text' placeholder='Digite seu nome' {...register('name')} />
              </Field>
              <Field label='Email' invalid={!!errors.email} errorText={errors.email?.message}>
                <Input type='email' placeholder='Digite seu email' {...register('email')} />
              </Field>
              <Field label='Senha' invalid={!!errors.password} errorText={errors.password?.message}>
                <PasswordInput placeholder='Digite sua senha' {...register('password')} />
              </Field>
              <Field
                label='Confirme a Senha'
                invalid={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              >
                <PasswordInput placeholder='Confirme sua senha' {...register('confirmPassword')} />
              </Field>
            </VStack>
          </Card.Body>
          <Card.Footer>
            <VStack gap='4' w='100%'>
              <Button mt={4} colorPalette='blue' loading={isSubmitting} type='submit' w='100%'>
                Cadastre-se
              </Button>
              <div className={classes.errorContainer}>
                <span>{mutation.error && 'Credenciais incorretas'}</span>
              </div>
              <Text>
                Já tem uma conta?{' '}
                <Link color='blue.500' href='/signin'>
                  Entrar
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
