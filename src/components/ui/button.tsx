import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { AbsoluteCenter, Button as ChakraButton, Span, Spinner } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

type ButtonContentProps = {
  loading?: boolean
  loadingText?: React.ReactNode
  children: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

const ButtonContent = ({ loading, loadingText, children }: Readonly<ButtonContentProps>) => {
  if (loading) {
    if (loadingText) {
      return (
        <>
          <Spinner size='inherit' color='inherit' data-testid='spinner' />
          {loadingText}
        </>
      )
    }

    return (
      <>
        <AbsoluteCenter display='inline-flex'>
          <Spinner size='inherit' color='inherit' data-testid='spinner' />
        </AbsoluteCenter>
        <Span opacity='0'>{children}</Span>
      </>
    )
  }

  return <>{children}</>
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { loading, disabled, loadingText, children, ...rest } = props

  return (
    <ChakraButton gap='2' disabled={loading || disabled} ref={ref} {...rest}>
      <ButtonContent loading={loading} loadingText={loadingText}>
        {children}
      </ButtonContent>
    </ChakraButton>
  )
})
