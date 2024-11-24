import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { AuthContextType } from '$/contexts/AuthContext'
import { lazy } from 'react'

type MyRouterContext = {
  queryClient: QueryClient
  auth: AuthContextType
}

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then(res => ({
        default: res.TanStackRouterDevtools
      }))
    )

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
