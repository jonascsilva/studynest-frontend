import { createLazyFileRoute, Link } from '@tanstack/react-router'

import classes from './index.module.scss'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.leftContainer}>
          <h1 className={classes.heading}>
            Study<span>Nest</span>
          </h1>
        </div>
        <div className={classes.rightContainer}>
          <Link to='/dashboard'>
            <button className={classes.button}>Dashboard</button>
          </Link>
        </div>
      </nav>
      <main className={classes.main}>
        <section className={classes.section}>
          <div className={classes.imageContainer}>Flashcards images placeholder</div>
          <div>
            <h2>Estude Menos, Aprenda Mais!</h2>
            <h3>Sua ferramenta completa para um aprendizado eficiente.</h3>
          </div>
        </section>
      </main>
    </div>
  )
}
