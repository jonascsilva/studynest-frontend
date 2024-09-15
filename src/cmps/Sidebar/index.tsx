import { Link } from '@tanstack/react-router'
import { Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import classes from './index.module.scss'

const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <Link to='/dashboard' className={classes.link}>
        <Heading className={classes.heading} size='2xl'>
          Study<span>Nest</span>
        </Heading>
      </Link>
      <Link to='/notes' className={classes.link}>
        <Button width='100%'>Anotações</Button>
      </Link>
      <Link to='/' className={classes.link}>
        <Button width='100%'>Sair</Button>
      </Link>
    </aside>
  )
}

export { Sidebar }
