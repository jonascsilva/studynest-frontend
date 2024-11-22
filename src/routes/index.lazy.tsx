import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Button, Heading, Text } from '@chakra-ui/react'

import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'
import { ColorModeButton } from '$/components/ui/color-mode-button'

const Route = createLazyFileRoute('/')({
  component: Component
})

function Component() {
  const auth = useAuth()

  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.leftContainer}>
          <Heading as='h1' size='5xl' className={classes.heading}>
            Study<span>Nest</span>
          </Heading>
        </div>
        <div className={classes.rightContainer}>
          {auth.user ? (
            <Link to='/home'>
              <Button colorPalette='blue' size='xl'>
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to='/signin'>
                <Button colorPalette='green' size='xl'>
                  Entrar
                </Button>
              </Link>
              <Link to='/signup'>
                <Button colorPalette='blue' size='xl'>
                  Criar conta
                </Button>
              </Link>
            </>
          )}
          <ColorModeButton />
        </div>
      </nav>
      <main className={classes.main}>
        <section className={classes.section}>
          <div className={classes.imageContainer}>
            <img src='/flashcards-2.png' alt='flashcards' />
          </div>
          <div className={classes.textContainer}>
            <Heading as='h2' size='4xl'>
              Aprenda hoje, lembre-se para sempre!
            </Heading>
            <Text fontSize='3xl'>Sua ferramenta completa para um aprendizado eficiente.</Text>
          </div>
        </section>
      </main>
    </div>
  )
}

export { Route, Component }
