import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { AuthContext } from '$/contexts/auth'

type MyRouterContext = {
  queryClient: QueryClient
  auth: AuthContext
}

const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Component
})

function Component() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  )
}

export { Route }

export type { MyRouterContext }
