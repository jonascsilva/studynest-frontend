import { Spinner } from '@chakra-ui/react'
import { clsx } from 'clsx'

import classes from './index.module.scss'

type Props = {
  fullPage?: boolean
}

function Pending({ fullPage }: Props) {
  const className = clsx(classes.container, { [classes.fullPage]: fullPage })

  return (
    <div className={className}>
      <Spinner size='xl' role='status' />
    </div>
  )
}

export { Pending }
