import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Button, Heading, Text } from '@chakra-ui/react'

import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'

const Route = createLazyFileRoute('/')({
  component: Component
})

function Component() {
  const auth = useAuth()

  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.leftContainer}>
          <Heading as='h1' size='2xl' className={classes.heading}>
            Study<span>Nest</span>
          </Heading>
        </div>
        <div className={classes.rightContainer}>
          {auth.user ? (
            <Link to='/home'>
              <Button colorScheme='blue' size='lg'>
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to='/signin'>
                <Button colorScheme='green' size='lg'>
                  Entrar
                </Button>
              </Link>
              <Link to='/signup'>
                <Button colorScheme='blue' size='lg'>
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className={classes.main}>
        <section className={classes.section}>
          <div className={classes.imageContainer}>PLACEHOLDER</div>
          <div className={classes.textContainer}>
            <Heading as='h2' size='2xl'>
              Aprenda hoje, lembre-se para sempre!
            </Heading>
            <Text fontSize='2xl'>Sua ferramenta completa para um aprendizado eficiente.</Text>
          </div>
        </section>
      </main>
    </div>
  )
}

export { Route, Component }
