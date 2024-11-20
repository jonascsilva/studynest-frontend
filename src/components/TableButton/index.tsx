import { Tooltip } from '$/components/ui/tooltip'
import { IconButton } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ onClick?: () => void; label: string; colorPalette: string }>

function TableButton({ label, colorPalette, onClick, children }: Props) {
  return (
    <Tooltip content={label} openDelay={300} closeDelay={100}>
      <IconButton
        aria-label={label}
        variant='surface'
        colorPalette={colorPalette}
        onClick={onClick}
      >
        {children}
      </IconButton>
    </Tooltip>
  )
}

export { TableButton }
