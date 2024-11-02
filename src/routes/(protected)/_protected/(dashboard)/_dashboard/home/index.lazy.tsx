import { createLazyFileRoute } from '@tanstack/react-router'
import { Alert, AlertIcon, Heading } from '@chakra-ui/react'
import { useAuth } from '$/hooks/useAuth'

import classes from './index.module.scss'

const Route = createLazyFileRoute('/(protected)/_protected/(dashboard)/_dashboard/home/')({
  component: Component
})

function Component() {
  const auth = useAuth()
  const user = auth.user

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Heading className={classes.heading}>
          Bem vindo <span>{user?.name || user?.email}</span>!
        </Heading>
      </div>
      <section className={classes.section}>
        <Heading size='md'>Revisar</Heading>
        <div>
          <Alert status='success'>
            <AlertIcon />
            Nada para revisar no momento. Continue assim!
          </Alert>
        </div>
      </section>
    </div>
  )
}

export { Route, Component }
