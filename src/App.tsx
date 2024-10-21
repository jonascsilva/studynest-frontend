import { RouterProvider } from '@tanstack/react-router'

import { useAuth } from '$/hooks/useAuth'

import './main.scss'
import { router } from '$/router'

function App() {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ auth }} />
}

export { App }
