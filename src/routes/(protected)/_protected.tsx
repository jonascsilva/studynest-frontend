import { useAuth } from '$/hooks/useAuth'
import { Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'

const Route = createFileRoute('/(protected)/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/signin'
      })
    }
  },
  component: Component
})

function Component() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/signin', replace: true })
    }
  }, [isAuthenticated, navigate])

  return <Outlet />
}

export { Route, Component }
