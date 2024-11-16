import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkeletonText } from '$/components/ui/skeleton'
import { renderWithContext } from '../../customRender'
import { createRef } from 'react'

describe('SkeletonText Component', () => {
  it('should render default number of skeleton lines when noOfLines is not provided', () => {
    renderWithContext(() => <SkeletonText />)

    const skeletons = screen.getAllByTestId('skeleton')

    expect(skeletons).toHaveLength(3)
  })

  it('should render the correct number of skeleton lines based on noOfLines prop', () => {
    renderWithContext(() => <SkeletonText noOfLines={5} />)

    const skeletons = screen.getAllByTestId('skeleton')

    expect(skeletons).toHaveLength(5)
  })

  it('should forward ref to Stack', () => {
    const ref = createRef<HTMLDivElement>()

    renderWithContext(() => <SkeletonText ref={ref} />)

    expect(ref.current).not.toBeNull()
  })
})
