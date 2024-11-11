import React from 'react'
import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkeletonText } from '$/components/ui/skeleton'
import { renderWithContext } from '../../customRender'

describe('SkeletonText Component', () => {
  it('renders default number of skeleton lines when noOfLines is not provided', () => {
    renderWithContext(() => <SkeletonText />)

    const skeletons = screen.getAllByTestId('skeleton')

    expect(skeletons).toHaveLength(3)
  })

  it('renders the correct number of skeleton lines based on noOfLines prop', () => {
    renderWithContext(() => <SkeletonText noOfLines={5} />)

    const skeletons = screen.getAllByTestId('skeleton')

    expect(skeletons).toHaveLength(5)
  })

  it('forwards ref to Stack', () => {
    const ref = React.createRef<HTMLDivElement>()

    renderWithContext(() => <SkeletonText ref={ref} />)

    expect(ref.current).not.toBeNull()
  })
})
