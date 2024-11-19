import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as ChakraProvider } from '$/components/ui/provider'

import { queryClient } from '$/lib/query'
import { AuthProvider } from '$/contexts/AuthProvider'
import { App } from '$/App'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  )
}
