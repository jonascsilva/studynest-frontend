import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'

import { customSystem } from '$/styles/theme'
import { PropsWithChildren } from 'react'

export function Provider(props: Readonly<PropsWithChildren>) {
  return (
    <ChakraProvider value={customSystem}>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
