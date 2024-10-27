import { describe, it, expect } from 'vitest'
import { Route } from '$/routes/(auth)/signin'
import { redirect } from '@tanstack/react-router'
import { MyRouterContext } from '$/routes/__root'

describe('Protected Route beforeLoad', () => {
  it('throws redirect to /home if authenticated', () => {
    const context = { auth: { isAuthenticated: true } } as MyRouterContext

    let thrownError

    try {
      Route.options.beforeLoad!({ context } as any)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toEqual(
      redirect({
        to: '/home'
      })
    )
  })

  it('does not throw if authenticated', () => {
    const context = { auth: { isAuthenticated: false } } as MyRouterContext

    let thrownError

    try {
      Route.options.beforeLoad!({ context } as any)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeUndefined()
  })
})
