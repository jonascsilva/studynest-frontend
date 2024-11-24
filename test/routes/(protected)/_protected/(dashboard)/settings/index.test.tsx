import { screen } from '@testing-library/react'
import { it, expect, beforeAll, beforeEach, Mock } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/settings'
import { vi } from 'vitest'
import { describe } from 'node:test'
import { settingsQueryOptions } from '$/query/settingsOptions'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { UserSettingsType } from '$/types'
import userEvent from '@testing-library/user-event'
import { updateUserSettings } from '$/query/settings'
import { queryClient } from '$/lib/query'

vi.mock('$/query/settings')

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

vi.mock(import('@tanstack/react-query'), async importOriginal => {
  const actual = await importOriginal()

  return {
    ...actual,
    useSuspenseQuery: vi.fn()
  }
})

describe('Settings Route', () => {
  const settingsMock = {
    intervalsQuantity: 5,
    baseInterval: 2,
    intervalIncreaseRate: 2
  } as UserSettingsType

  beforeEach(() => {
    vi.mocked(settingsQueryOptions().queryFn as Mock).mockResolvedValue(settingsMock)
    vi.mocked(useSuspenseQuery).mockReturnValue({ data: settingsMock } as UseSuspenseQueryResult<
      unknown,
      unknown
    >)
  })

  it('should render all sliders with correct labels and default values', () => {
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

  it('should sumbit sliders values and call mutation', async () => {
    const user = userEvent.setup()

    vi.mocked(updateUserSettings).mockResolvedValue(settingsMock)

    vi.spyOn(queryClient, 'setQueryData')

    renderWithContext(Component)

    const slider1 = screen.getByLabelText('slider-settings-1')
    const slider2 = screen.getByLabelText('slider-settings-2')
    const slider3 = screen.getByLabelText('slider-settings-3')

    expect(slider1).toHaveValue(5)
    expect(slider2).toHaveValue(2)
    expect(slider3).toHaveValue(2)

    await user.click(screen.getByRole('button', { name: /salvar/i }))

    expect(queryClient.setQueryData).toHaveBeenCalledOnce()
    expect(queryClient.setQueryData).toHaveBeenCalledWith(['settings'], settingsMock)
  })
})
