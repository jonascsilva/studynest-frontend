import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { createRoute } from '@tanstack/react-router'
import { renderWithContext } from '../../customRender.tsx'

import { LayoutComponent } from '$/routes/(dashboard)/_dashboard.tsx'

vi.mock('$/cmps/Sidebar', () => ({
  Sidebar: () => <div data-testid='sidebar'>Sidebar</div>
}))

describe('LayoutComponent', () => {
  it('renders the Sidebar and Outlet correctly', () => {
    renderWithContext(
      LayoutComponent,
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
})
