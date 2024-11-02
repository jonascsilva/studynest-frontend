import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Input, VStack, Text, Link, Card } from '@chakra-ui/react'
import { Field } from '$/components/ui/field'
import { Button } from '$/components/ui/button'

import classes from './index.module.scss'
import { PasswordInput } from '$/components/ui/password-input'

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Route = createFileRoute('/(auth)/signup/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/home' })
    }
  },
  component: Component
})

function Component() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className={classes.container}>
      <Card.Root w='25%'>
        <Card.Header>
          <Card.Title fontSize='xl'>Cadastre-se</Card.Title>
        </Card.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <VStack gap='4'>
              <Field label='Nome' invalid={!!errors.name} errorText={errors.name?.message}>
                <Input
                  type='text'
                  placeholder='Digite seu nome'
                  {...register('name', {
                    required: 'Nome é obrigatório'
                  })}
                />
              </Field>
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
              <Field
                label='Confirme a Senha'
                invalid={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              >
                <PasswordInput
                  placeholder='Confirme sua senha'
                  {...register('confirmPassword', {
                    required: 'Confirmação de senha é obrigatória',
                    validate: value => value === watch('password') || 'As senhas não correspondem'
                  })}
                />
              </Field>
            </VStack>
          </Card.Body>
          <Card.Footer>
            <VStack gap='4' w='100%'>
              <Button mt={4} colorPalette='blue' loading={isSubmitting} type='submit' width='100%'>
                Cadastre-se
              </Button>
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
