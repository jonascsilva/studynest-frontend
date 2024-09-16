import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter
} from '@tanstack/react-router'
import { render } from '@testing-library/react'

const createTestRouter = (component: () => JSX.Element) => {
  const rootRoute = createRootRoute({
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
    history: createMemoryHistory()
  })

  return router
}

const renderWithContext = (component: () => JSX.Element) => {
  const router = createTestRouter(component)

  // eslint-disable-next-line
  return render(<RouterProvider router={router as any} />)
}

export { renderWithContext }
