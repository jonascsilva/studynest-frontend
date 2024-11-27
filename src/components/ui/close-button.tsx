import type { ButtonProps as ChakraCloseButtonProps } from '@chakra-ui/react'
import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import * as React from 'react'
import { LuArrowLeft } from 'react-icons/lu'

export interface CloseButtonProps extends ChakraCloseButtonProps {}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <ChakraIconButton
        variant='ghost'
        aria-label='Close'
        data-testid='close-button'
        ref={ref}
        {...props}
      >
        {props.children ?? <LuArrowLeft />}
      </ChakraIconButton>
    )
  }
)
