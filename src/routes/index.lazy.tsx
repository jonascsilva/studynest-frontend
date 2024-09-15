import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Button, Heading } from '@chakra-ui/react'

import classes from './index.module.scss'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.leftContainer}>
          <Heading className={classes.heading}>
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
          <div className={classes.imageContainer}>Flashcards images placeholder</div>
          <div>
            <h2>Aprenda hoje, lembre para sempre</h2>
            <h3>Sua ferramenta completa para um aprendizado eficiente.</h3>
          </div>
        </section>
      </main>
    </div>
  )
}
