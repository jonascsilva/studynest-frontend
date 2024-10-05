import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Button, Heading, Text } from '@chakra-ui/react'

import classes from './index.module.scss'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.leftContainer}>
          <Heading size='2xl' className={classes.heading}>
            Study<span>Nest</span>
          </Heading>
        </div>
        <div className={classes.rightContainer}>
          <Link to='/dashboard'>
            <Button colorScheme='blue' size='lg'>
              Dashboard
            </Button>
          </Link>
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
