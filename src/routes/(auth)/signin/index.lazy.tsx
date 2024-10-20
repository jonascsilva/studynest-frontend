import { createLazyFileRoute } from '@tanstack/react-router'
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

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
}

const Route = createLazyFileRoute('/(auth)/signin/')({
  component: Component
})

function Component() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
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
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
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
