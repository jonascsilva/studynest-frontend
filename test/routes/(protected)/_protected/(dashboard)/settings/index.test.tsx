import { screen, waitFor } from '@testing-library/react'
import { it, expect, beforeAll, beforeEach, vi, describe } from 'vitest'
import { renderWithContext } from '../../../../../customRender'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/settings'
import { settingsQueryOptions } from '$/query/settingsOptions'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { UserSettingsType } from '$/types'
import userEvent from '@testing-library/user-event'
import { updateUserSettings } from '$/query/settings'
import { queryClient } from '$/lib/query'
import { within } from '@testing-library/react'

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
    intervalIncreaseRate: 3
  } as UserSettingsType

  beforeEach(() => {
    vi.mocked(settingsQueryOptions().queryFn!).mockResolvedValue(settingsMock)
    vi.mocked(useSuspenseQuery).mockReturnValue({
      data: settingsMock
    } as UseSuspenseQueryResult<unknown, unknown>)
  })

  it('should render all sliders with correct labels and default values', () => {
    renderWithContext(Component)

    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.getByText('Quantidade de intervalos:')).toBeInTheDocument()
    expect(screen.getByText('Intervalo base:')).toBeInTheDocument()
    expect(screen.getByText('Aumento dos intervalos:')).toBeInTheDocument()

    const intervalsQuantityText = screen.getByText('Quantidade de intervalos:')

    expect(within(intervalsQuantityText).getByText('5')).toBeInTheDocument()

    const baseIntervalText = screen.getByText('Intervalo base:')

    expect(within(baseIntervalText).getByText('2')).toBeInTheDocument()

    const intervalIncreaseRateText = screen.getByText('Aumento dos intervalos:')

    expect(within(intervalIncreaseRateText).getByText('3')).toBeInTheDocument()
  })

  it('should submit sliders values and call mutation', async () => {
    const user = userEvent.setup()

    const updatedSettings = {
      ...settingsMock,
      intervalsQuantity: 4
    }

    vi.mocked(updateUserSettings).mockResolvedValue(updatedSettings)

    vi.spyOn(queryClient, 'setQueryData')

    renderWithContext(Component)

    const intervalsQuantityText = screen.getByText('Quantidade de intervalos:')

    expect(within(intervalsQuantityText).getByText('5')).toBeInTheDocument()

    const sliderThumbs = screen.getAllByTestId('slider-thumb')
    const intervalsQuantityThumb = sliderThumbs[0]

    intervalsQuantityThumb.focus()

    await user.keyboard('[ArrowLeft]')

    expect(within(intervalsQuantityText).getByText('4')).toBeInTheDocument()

    const saveButton = screen.getByRole('button', { name: /salvar/i })
    expect(saveButton).toBeInTheDocument()

    await user.click(saveButton)

    await waitFor(() => {
      expect(updateUserSettings).toHaveBeenCalledWith({
        intervalsQuantity: 4,
        baseInterval: settingsMock.baseInterval,
        intervalIncreaseRate: settingsMock.intervalIncreaseRate
      })
    })

    expect(queryClient.setQueryData).toHaveBeenCalledOnce()
    expect(queryClient.setQueryData).toHaveBeenCalledWith(['settings'], updatedSettings)
  })
})
