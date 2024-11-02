import { Link } from '@tanstack/react-router'
import { Heading } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'

function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className={classes.sidebar}>
      <Heading className={classes.heading} size='5xl'>
        Study<span>Nest</span>
      </Heading>
      <Link to='/home' className={classes.link}>
        <Button size='lg' variant='surface' width='100%'>
          Dashboard
        </Button>
      </Link>
      <Link to='/notes' className={classes.link}>
        <Button size='lg' variant='surface' width='100%'>
          Anotações
        </Button>
      </Link>
      <Link to='/flashcards' className={classes.link}>
        <Button size='lg' variant='surface' width='100%'>
          Flashcards
        </Button>
      </Link>
      <Link to='/ai' className={classes.link}>
        <Button size='lg' variant='surface' width='100%'>
          AI
        </Button>
      </Link>
      <Link to='/settings' className={classes.link}>
        <Button size='lg' variant='surface' width='100%'>
          Configurações
        </Button>
      </Link>
      <Button size='lg' variant='surface' width='100%' onClick={logout}>
        Sair
      </Button>
    </aside>
  )
}

export { Sidebar }
