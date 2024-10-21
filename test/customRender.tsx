import { MyRouterContext } from '$/routes/__root'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter
} from '@tanstack/react-router'
import { theme } from '$/lib/theme'
import { queryClient } from '$/lib/query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { render, RenderResult } from '@testing-library/react'
import { AuthProvider } from '$/contexts/auth'

type AddRoutesCallback = (parentRoute: any) => void

const renderWithContext = (
  component: () => JSX.Element,
  addRoutes?: AddRoutesCallback,
  initialEntries: string[] = ['/']
): RenderResult => {
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
      auth: undefined!
    },
    history: createMemoryHistory({
      initialEntries
    })
  })

  return render(
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router as any} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export { renderWithContext }
