import { it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { createRoute } from '@tanstack/react-router'

import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard'

import { renderWithContext } from '../../../../customRender'

vi.mock('$/components/Sidebar', () => ({
  Sidebar: () => <div data-testid='sidebar'>Sidebar</div>
}))

it('should the Sidebar and Outlet correctly', () => {
  renderWithContext(
    Component,
    indexRoute => {
      const ChildRoute = createRoute({
        getParentRoute: () => indexRoute,
        path: 'dashboard',
        component: () => <div data-testid='outlet-content'>Outlet Content</div>
      })

      indexRoute.addChildren([ChildRoute])
    },
    ['/dashboard']
  )

  expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  expect(screen.getByTestId('outlet-content')).toBeInTheDocument()
})
