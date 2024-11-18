import { useColorMode } from '$/hooks/useColorMode'
import type { IconButtonProps } from '@chakra-ui/react'
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

function ColorModeIcon() {
  const { colorMode } = useColorMode()

  return colorMode === 'light' ? <LuSun /> : <LuMoon />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()

    return (
      <ClientOnly fallback={<Skeleton boxSize='12' />}>
        <IconButton
          onClick={toggleColorMode}
          variant='outline'
          aria-label='Toggle color mode'
          size='xl'
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5'
            }
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    )
  }
)
