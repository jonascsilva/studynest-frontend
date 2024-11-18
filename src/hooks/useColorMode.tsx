import { useTheme } from 'next-themes'

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode
  }
}
