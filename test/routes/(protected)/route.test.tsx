import { describe, it, expect } from 'vitest'
import { Route } from '$/routes/(protected)/_protected'
import { redirect } from '@tanstack/react-router'
import { MyRouterContext } from '$/routes/__root'

describe('Protected Route beforeLoad', () => {
  it('should redirect to /signin if not authenticated', () => {
    const context = { auth: { isAuthenticated: false } } as MyRouterContext

    let thrownError

    try {
      Route.options.beforeLoad!({ context } as any)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toEqual(
      redirect({
        to: '/signin'
      })
    )
  })

  it('should not redirect if authenticated', () => {
    const context = { auth: { isAuthenticated: true } } as MyRouterContext

    let thrownError

    try {
      Route.options.beforeLoad!({ context } as any)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeUndefined()
  })
})
