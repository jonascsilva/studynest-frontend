import { it, expect, vi, describe } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/settings'
import { queryClient } from '$/lib/query'
import { settingsQueryOptions } from '$/query/settingsOptions'
import { fetchUserSettings } from '$/query/settings'
import { UserSettingsType } from '$/types'

vi.mock('$/query/settings')

describe('settingss Route', () => {
  it('should ensure query data is preloaded', async () => {
    const mockData = {
      baseInterval: 2,
      intervalsQuantity: 2,
      intervalIncreaseRate: 2
    } as UserSettingsType

    vi.mocked(fetchUserSettings).mockResolvedValue(mockData)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    const data = queryClient.getQueryData(['settings'])

    expect(data).toEqual(mockData)
  })

  it('should use the correct options', async () => {
    const ensureQueryDataMock = vi
      .spyOn(queryClient, 'ensureQueryData')
      .mockResolvedValue(undefined)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    expect(ensureQueryDataMock).toHaveBeenCalledTimes(1)

    const expectedOptions = settingsQueryOptions()

    expect(ensureQueryDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedOptions.queryKey,
        queryFn: expect.any(Function)
      })
    )
  })
})
