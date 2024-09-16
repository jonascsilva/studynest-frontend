import React from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider
} from '@tanstack/react-router'
import { render } from '@testing-library/react'

function customRender(component: () => React.JSX.Element) {
  const rootRoute = createRootRoute({
    component: Outlet
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component
  })

  const routeTree = rootRoute.addChildren([indexRoute])

  const router = createRouter({ routeTree })

  render(<RouterProvider router={router} />)
}

export { customRender }
