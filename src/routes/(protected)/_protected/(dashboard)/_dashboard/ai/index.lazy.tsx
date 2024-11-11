import { generateFlashcard } from '$/query/flashcards'
import { Button, Heading, Spinner, Text } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import classes from './index.module.scss'

const Route = createLazyFileRoute('/(protected)/_protected/(dashboard)/_dashboard/ai/')({
  component: Component
})

function Component() {
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [subject, setSubject] = useState('')
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['generateFlashcard'],
    mutationFn: generateFlashcard,
    onSuccess: data => {
      queryClient.setQueryData(['flashcards', 'ai'], data)

      const { answer, question, subject } = data

      setAnswer(answer)
      setQuestion(question)
      setSubject(subject)
    }
  })

  return (
    <div className={classes.container}>
      <Button colorPalette='blue' onClick={() => mutation.mutate()}>
        Gerar
      </Button>
      <div className={classes.response}>
        {mutation.isPending ? (
          <Spinner size='xl' />
        ) : (
          <>
            <Heading size='3xl'>{subject}</Heading>
            <Heading size='lg'>{question}</Heading>
            <Text>{answer}</Text>
          </>
        )}
      </div>
    </div>
  )
}

export { Route, Component }
