import { describe, it, expect, vi } from 'vitest'
import { Route } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/notes'
import { queryClient } from '$/lib/query'
import { notesQueryOptions } from '$/query/notesOptions'

describe('Notes Route', () => {
  it('loader ensures query data is preloaded', async () => {
    const ensureQueryDataMock = vi
      .spyOn(queryClient, 'ensureQueryData')
      .mockResolvedValue(undefined)

    const loaderParams = { context: { queryClient } }

    await Route.options.loader!(loaderParams as any)

    expect(ensureQueryDataMock).toHaveBeenCalledWith(notesQueryOptions)
  })
})
