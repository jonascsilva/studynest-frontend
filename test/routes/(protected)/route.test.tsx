import { describe, it, expect } from 'vitest'
import { Route } from '$/routes/(protected)/_protected'
import { ParsedLocation, redirect } from '@tanstack/react-router'
import { MyRouterContext } from '$/routes/__root'

describe('Protected Route beforeLoad', () => {
  it('should redirect to /signin if not authenticated', () => {
    const context = { auth: { isAuthenticated: false } } as MyRouterContext
    const location = { href: '/protected' } as ParsedLocation

    let thrownError

    try {
      Route.options.beforeLoad!({ context, location } as any)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toEqual(
      redirect({
        to: '/signin',
        search: {
          redirect: location.href
        }
      })
    )
  })

  it('should not redirect if authenticated', () => {
    const context = { auth: { isAuthenticated: true } } as MyRouterContext
    const location = { href: '/protected' } as ParsedLocation

    let thrownError

    try {
      Route.options.beforeLoad!({ context, location } as any)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeUndefined()
  })
})
