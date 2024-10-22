import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Heading,
  Text,
  Link
} from '@chakra-ui/react'
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
      <Box p={8} borderWidth={1} borderRadius='lg' boxShadow='lg' maxW='md' width='100%'>
        <Heading mb={6} as='h2' size='lg' textAlign='center'>
          Entrar
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl id='email' isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
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
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id='password' isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                type='password'
                placeholder='Digite sua senha'
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: { value: 6, message: 'O comprimento mínimo é 6' }
                })}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme='blue' isLoading={isSubmitting} type='submit' width='100%'>
              Entrar
            </Button>

            <Text>
              Não tem uma conta?{' '}
              <Link color='blue.500' href='/signup'>
                Cadastre-se
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </div>
  )
}

export { Route, Component }
