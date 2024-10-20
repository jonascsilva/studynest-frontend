import { createLazyFileRoute } from '@tanstack/react-router'
import { Alert, AlertIcon, Heading } from '@chakra-ui/react'

import classes from './index.module.scss'

const Route = createLazyFileRoute('/(dashboard)/_dashboard/dashboard/')({
  component: Component
})

function Component() {
  return (
    <div className={classes.container}>
      <Heading className={classes.heading}>
        Bem vindo <span>USER</span>!
      </Heading>
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
