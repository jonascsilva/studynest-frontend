import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkeletonText } from '$/components/ui/skeleton'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import { createRef } from 'react'

describe('SkeletonText Component', () => {
  it('should render default number of skeleton lines when noOfLines is not provided', () => {
    render(
      <ChakraProvider>
        <SkeletonText />
      </ChakraProvider>
    )

    const skeletons = screen.getAllByTestId('skeleton')

    expect(skeletons).toHaveLength(3)
  })

  it('should render the correct number of skeleton lines based on noOfLines prop', () => {
    render(
      <ChakraProvider>
        <SkeletonText noOfLines={5} />
      </ChakraProvider>
    )

    const skeletons = screen.getAllByTestId('skeleton')

    expect(skeletons).toHaveLength(5)
  })

  it('should forward ref to Stack', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <ChakraProvider>
        <SkeletonText ref={ref} />
      </ChakraProvider>
    )

    expect(ref.current).not.toBeNull()
  })
})
