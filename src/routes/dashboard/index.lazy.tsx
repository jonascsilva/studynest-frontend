import { createLazyFileRoute } from '@tanstack/react-router'

import classes from './index.module.scss'

export const Route = createLazyFileRoute('/dashboard/')({
  component: Index
})

function Index() {
  // const notes = await prisma.note.findMany()

  return (
    <>
      <h2 className={classes.heading}>
        Bem vindo <span>USER</span>!
      </h2>
      <h3>Recentes</h3>
      <div>
        {/* notes.map(note => (
          <div key={note.id}>{note.title}</div>
        )) */}
      </div>
    </>
  )
}
