import { Table, Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  truncate?: boolean
  align?: string
}>

function TextCell({ children, truncate = true, align = 'left' }: Readonly<Props>) {
  return (
    <Table.Cell maxW='0' textAlign={align}>
      <Text truncate={truncate}>{children}</Text>
    </Table.Cell>
  )
}

export { TextCell }
