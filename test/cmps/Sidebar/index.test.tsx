import React from 'react'
import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { Sidebar } from '$/cmps/Sidebar'
import { customRender } from '../../customRender'

test('Sidebar renders correctly', () => {
  customRender(() => <Sidebar />)

  expect(screen.getByText('Study')).toBeInTheDocument()
  expect(screen.getByText('Nest')).toBeInTheDocument()
})
