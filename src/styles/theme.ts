import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    breakpoints: {
      base: '0px',
      xs: '600px',
      sm: '960px',
      md: '1280px',
      lg: '1536px',
      xl: '1920px'
    }
  }
})

const customSystem = createSystem(defaultConfig, config)

export { customSystem }
