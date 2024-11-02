import { createLazyFileRoute } from '@tanstack/react-router'
import { Heading } from '@chakra-ui/react'
import { useAuth } from '$/hooks/useAuth'
import { Alert } from '$/components/ui/alert'

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
        <Heading size='4xl' className={classes.heading}>
          Bem vindo <span>{user?.name || user?.email}</span>!
        </Heading>
      </div>
      <section className={classes.section}>
        <Heading size='2xl'>Revisar</Heading>
        <div>
          <Alert status='success' title='Nada para revisar no momento. Continue assim!' />
        </div>
      </section>
    </div>
  )
}

export { Route, Component }
