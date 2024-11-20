import { RouterProvider } from '@tanstack/react-router'

import { useAuth } from '$/hooks/useAuth'
import { router } from '$/router'

import './main.scss'

function App() {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ auth }} />
}

export { App }
