import { Link } from '@tanstack/react-router'
import { Heading } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'
import { BsDoorOpen } from 'react-icons/bs'

function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className={classes.sidebar}>
      <Heading className={classes.heading} size='5xl'>
        Study<span>Nest</span>
      </Heading>
      <Link to='/home' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            Dashboard
          </Button>
        )}
      </Link>
      <Link to='/notes' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            Anotações
          </Button>
        )}
      </Link>
      <Link to='/flashcards' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            Flashcards
          </Button>
        )}
      </Link>
      <Link to='/ai' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            AI
          </Button>
        )}
      </Link>
      <Link to='/settings' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            Configurações
          </Button>
        )}
      </Link>
      <Button size='lg' variant='outline' colorPalette='red' width='100%' onClick={logout}>
        <BsDoorOpen /> Sair
      </Button>
    </aside>
  )
}

export { Sidebar }
