import { Tooltip } from '$/components/ui/tooltip'
import { IconButton } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  onClick?: () => void
  label: string
  colorPalette: string
  disabled?: boolean
  variant?: 'surface' | 'outline' | 'solid' | 'subtle' | 'ghost' | 'plain'
}>

function TableButton({
  label,
  colorPalette,
  onClick,
  children,
  disabled,
  variant = 'surface'
}: Props) {
  return (
    <Tooltip content={label} openDelay={300} closeDelay={100}>
      <IconButton
        aria-label={label}
        variant={variant}
        colorPalette={colorPalette}
        onClick={onClick}
        disabled={disabled}
        size={{ base: 'xs', lg: 'sm', xl: 'md' }}
      >
        {children}
      </IconButton>
    </Tooltip>
  )
}

export { TableButton }
