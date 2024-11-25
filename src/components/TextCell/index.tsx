import { Table, Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

function TextCell({ children }: Readonly<PropsWithChildren>) {
  return (
    <Table.Cell maxW='0'>
      <Text truncate>{children}</Text>
    </Table.Cell>
  )
}

export { TextCell }
