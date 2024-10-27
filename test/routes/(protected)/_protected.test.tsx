import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Component } from '$/routes/(protected)/_protected'
import { createRoute } from '@tanstack/react-router'
import { screen } from '@testing-library/react'
import { renderWithContext } from '../../customRender'

describe('Protected Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Outlet', async () => {
    renderWithContext(
      Component,
      indexRoute => {
        const ChildRoute = createRoute({
          getParentRoute: () => indexRoute,
          path: 'protected',
          component: () => <div data-testid='outlet-content'>Outlet Content</div>
        })

        indexRoute.addChildren([ChildRoute])
      },
      ['/protected']
    )

    expect(screen.getByTestId('outlet-content')).toBeInTheDocument()
  })
})
