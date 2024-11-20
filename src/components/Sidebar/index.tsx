import { Link } from '@tanstack/react-router'
import { Heading, Separator } from '@chakra-ui/react'
import { Button } from '$/components/ui/button'
import classes from './index.module.scss'
import { useAuth } from '$/hooks/useAuth'
import {
  BsCardText,
  BsDoorOpen,
  BsFileEarmarkText,
  BsGear,
  BsHouseDoor,
  BsQuestionCircle
} from 'react-icons/bs'
import { ColorModeButton } from '$/components/ui/color-mode-button'

function Sidebar() {
  const { signout } = useAuth()

  return (
    <aside className={classes.sidebar}>
      <div className={classes.headerContainer}>
        <Heading className={classes.heading} size='5xl'>
          Study<span>Nest</span>
        </Heading>
        <ColorModeButton />
      </div>
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
      <Link to='/faq' className={classes.link}>
        {({ isActive }) => (
          <Button
            size='lg'
            variant='surface'
            colorPalette={isActive ? 'blue' : undefined}
            width='100%'
          >
            <BsQuestionCircle /> FAQ
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
            <BsGear /> Configurações
          </Button>
        )}
      </Link>
      <Button size='lg' variant='outline' colorPalette='red' width='100%' onClick={signout}>
        <BsDoorOpen /> Sair
      </Button>
    </aside>
  )
}

export { Sidebar }
