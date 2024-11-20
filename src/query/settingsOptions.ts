import { queryOptions } from '@tanstack/react-query'
import { fetchUserSettings } from './settings'

function settingsQueryOptions() {
  return queryOptions({
    queryKey: ['settings'],
    queryFn: fetchUserSettings
  })
}

export { settingsQueryOptions }
