import { screen } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/settings/index.lazy'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('Settings Component', () => {
  it('renders all sliders with correct labels and default values', () => {
    renderWithContext(Component)

    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.getByText('Quantidade de intervalos:')).toBeInTheDocument()
    expect(screen.getByText('Intervalo base:')).toBeInTheDocument()
    expect(screen.getByText('Aumento dos intervalos:')).toBeInTheDocument()

    const slider1 = screen.getByLabelText('slider-settings-1')
    const slider2 = screen.getByLabelText('slider-settings-2')
    const slider3 = screen.getByLabelText('slider-settings-3')

    expect(slider1).toHaveValue(5)
    expect(slider2).toHaveValue(2)
    expect(slider3).toHaveValue(2)
  })
})
