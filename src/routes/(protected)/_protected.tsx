import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

const Route = createFileRoute('/(protected)/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/signin'
      })
    }
  },
  component: Component
})

function Component() {
  return <Outlet />
}

export { Route, Component }
