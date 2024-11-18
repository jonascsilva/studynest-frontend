import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getFormattedDate } from '$/lib/datetime'

describe('getFormattedDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-01-01T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should format date correctly without showNow parameter', () => {
    const dateString = '2023-12-31T23:59:00Z'
    const result = getFormattedDate(dateString)
    const expected = new Date(dateString).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    expect(result).toBe(expected)
  })

  it('should format date correctly when showNow is false', () => {
    const dateString = '2023-12-31T23:59:00Z'
    const result = getFormattedDate(dateString, false)
    const expected = new Date(dateString).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    expect(result).toBe(expected)
  })

  it('should return "Agora" when showNow is true and date is in the past', () => {
    const dateInPast = '2022-12-31T23:59:00Z'
    const result = getFormattedDate(dateInPast, true)

    expect(result).toBe('Agora')
  })

  it('should format date when showNow is true and date is in the future', () => {
    const dateInFuture = '2023-12-31T23:59:00Z'
    const result = getFormattedDate(dateInFuture, true)
    const expected = new Date(dateInFuture).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    expect(result).toBe(expected)
  })

  it('should return "Invalid Date" when date string is invalid', () => {
    const invalidDateString = 'invalid-date'
    const result = getFormattedDate(invalidDateString)

    expect(result).toBe('Invalid Date')
  })

  it('should handle date equal to current date when showNow is true', () => {
    const currentDateString = '2023-01-01T12:00:00Z'
    const result = getFormattedDate(currentDateString, true)
    const expected = new Date(currentDateString).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    expect(result).toBe(expected)
  })

  it('should handle when showNow is true and date is exactly one millisecond in the past', () => {
    const dateJustPast = new Date(Date.now() - 1).toISOString()
    const result = getFormattedDate(dateJustPast, true)

    expect(result).toBe('Agora')
  })

  it('should handle when showNow is true and date is exactly one millisecond in the future', () => {
    const dateJustFuture = new Date(Date.now() + 1).toISOString()
    const result = getFormattedDate(dateJustFuture, true)
    const expected = new Date(dateJustFuture).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    expect(result).toBe(expected)
  })
})
