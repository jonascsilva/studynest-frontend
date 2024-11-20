import { createRouter } from '@tanstack/react-router'

import { queryClient } from '$/lib/query'
import { routeTree } from '$/routeTree.gen'
import { Pending } from '$/components/Pending'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => <Pending fullPage />,
  context: {
    queryClient,
    auth: undefined!
  }
})

type MyRouter = typeof router

declare module '@tanstack/react-router' {
  interface Register {
    router: MyRouter
  }
}

export { router }
export type { MyRouter }
