import { MyRouterContext } from '$/routes/__root'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter
} from '@tanstack/react-router'
import { queryClient } from '$/lib/query'
import { QueryClientProvider } from '@tanstack/react-query'
import { render, RenderResult } from '@testing-library/react'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import { AuthProvider } from '$/contexts/AuthProvider'
import { AuthContextType } from '$/contexts/AuthContext'

type AddRoutesCallback = (parentRoute: any) => void

const renderWithContext = (
  component: () => JSX.Element,
  addRoutes?: AddRoutesCallback,
  initialEntries: string[] = ['/'],
  authContent?: AuthContextType
): { router: any; renderResult: RenderResult } => {
  const rootRoute = createRootRouteWithContext<MyRouterContext>()({
    component: Outlet
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component
  })

  if (addRoutes) {
    addRoutes(indexRoute)
  }

  const routeTree = rootRoute.addChildren([indexRoute])

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
      auth: authContent!
    },
    history: createMemoryHistory({
      initialEntries
    })
  })

  const renderResult = render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router as any} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )

  return {
    router,
    renderResult
  }
}

export { renderWithContext }
