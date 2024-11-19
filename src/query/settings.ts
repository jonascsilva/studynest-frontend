import { UserSettingsType } from '$/types'
import { fetcher } from '$/query/fetcher'

async function fetchUserSettings(): Promise<UserSettingsType> {
  const userSettigns = await fetcher<UserSettingsType>('settings')

  return userSettigns
}

async function updateUserSettings(data: Partial<UserSettingsType>): Promise<UserSettingsType> {
  const userSettigns = await fetcher<UserSettingsType>('settings', 'PATCH', data)

  return userSettigns
}

export { fetchUserSettings, updateUserSettings }
