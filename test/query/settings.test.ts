import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchUserSettings, updateUserSettings } from '$/query/settings'
import { UserSettingsType } from '$/types'
import { fetcher } from '$/query/fetcher'

vi.mock('$/query/fetcher')

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchUserSettings', () => {
  it('should fetch settings', async () => {
    const settingsMock: Partial<UserSettingsType> = {
      intervalsQuantity: 2,
      baseInterval: 2,
      intervalIncreaseRate: 2
    }

    vi.mocked(fetcher).mockResolvedValueOnce(settingsMock)

    const result = await fetchUserSettings()

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(settingsMock)
  })
})

describe('updateUserSettings', () => {
  it('should update settings and return the updated value', async () => {
    const noteId = '123'
    const updateData: Partial<UserSettingsType> = { intervalsQuantity: 5 }
    const updatedSettings: Partial<UserSettingsType> = {
      id: noteId,
      intervalsQuantity: 5,
      baseInterval: 2,
      intervalIncreaseRate: 2
    }

    vi.mocked(fetcher).mockResolvedValueOnce(updatedSettings)

    const result = await updateUserSettings(updateData)

    expect(fetcher).toHaveBeenCalledOnce()
    expect(result).toEqual(updatedSettings)
  })
})
