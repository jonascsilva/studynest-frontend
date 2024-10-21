import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

const Route = createFileRoute('/(protected)/_protected')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: Component
})

function Component() {
  return <Outlet />
}

export { Route, Component }
