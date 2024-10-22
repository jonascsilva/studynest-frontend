import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ChakraBaseProvider } from '@chakra-ui/react'

import { queryClient } from '$/lib/query'
import { theme } from '$/lib/theme'
import { AuthProvider } from '$/contexts/auth'
import { App } from '$/App'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <StrictMode>
      <ChakraBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </ChakraBaseProvider>
    </StrictMode>
  )
}
