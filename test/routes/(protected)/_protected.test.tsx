import { describe, it, expect } from 'vitest'
import { Component } from '$/routes/(protected)/_protected'
import { createRoute } from '@tanstack/react-router'
import { screen } from '@testing-library/react'
import { renderWithContext } from '../../customRender'

describe('Protected Route', () => {
  it('should render the Outlet', async () => {
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
