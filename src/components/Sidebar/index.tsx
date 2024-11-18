import { Link } from '@tanstack/react-router'
import { Heading } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'
import { BsCardText, BsDoorOpen, BsFileEarmarkText, BsGear, BsHouseDoor } from 'react-icons/bs'
import { Separator } from '@chakra-ui/react'

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
            <BsHouseDoor /> Home
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
            <BsFileEarmarkText /> Anotações
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
            <BsCardText /> Flashcards
          </Button>
        )}
      </Link>
      <Separator />
      <Link to='/settings' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            <BsGear /> Configurações
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
