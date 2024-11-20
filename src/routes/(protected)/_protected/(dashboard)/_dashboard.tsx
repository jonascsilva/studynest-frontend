import { Outlet, createFileRoute } from '@tanstack/react-router'

import classes from './_dashboard.module.scss'
import { Sidebar } from '$/components/Sidebar'

const Route = createFileRoute('/(protected)/_protected/(dashboard)/_dashboard')({
  component: Component
})

function Component() {
  return (
    <div className={classes.container}>
      <Sidebar />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  )
}

export { Route, Component }
