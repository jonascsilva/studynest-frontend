import '@testing-library/jest-dom/vitest'
import React from 'react'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

const originalConsoleError = console.error

const jsDomCssError = 'Error: Could not parse CSS stylesheet'

console.error = (...params) => {
  if (!params.find(p => p?.toString().includes(jsDomCssError))) {
    originalConsoleError(...params)
  }
}

window.React = React

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  }

afterEach(() => {
  cleanup()
})
