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
import { render } from '@testing-library/react'

const createTestRouter = (component: () => JSX.Element) => {
  const rootRoute = createRootRouteWithContext<MyRouterContext>()({
    component: Outlet
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component
  })

  const routeTree = rootRoute.addChildren([indexRoute])

  const router = createRouter({
    routeTree,
    context: {
      queryClient
    },
    history: createMemoryHistory()
  })

  return router
}

const renderWithContext = (component: () => JSX.Element) => {
  const router = createTestRouter(component)

  return render(
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router as any} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export { renderWithContext }
