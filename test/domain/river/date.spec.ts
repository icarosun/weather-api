import { getDayOfYear, getDifferenceDatein24h } from '@/domain/river/date'
import { describe, it, expect } from 'vitest'

describe('getDayOfYear', () => {
  it('should return 1 for January 1st', () => {
    const date = new Date(2026, 0, 1)

    expect(getDayOfYear(date)).toBe(1)
  })

  it('should return 365 for December 31st in a non-leap year', () => {
    const date = new Date(2023, 11, 31)

    expect(getDayOfYear(date)).toBe(365)
  })

  it('should correctly calculate day of year after February in a leap year', () => {
    const date = new Date(2024, 2, 1)

    expect(getDayOfYear(date)).toBe(61)
  })

  it('should correctly calculate day of year after February in a non-leap year', () => {
    const date = new Date(2023, 2, 1)

    expect(getDayOfYear(date)).toBe(60)
  })
})

describe('getDifferenceDatein24h', () => {
  it('should return the previous day', () => {
    const date = new Date(2023, 5, 10)
    const result = getDifferenceDatein24h(date)

    expect(result.getDate()).toBe(9)
    expect(result.getMonth()).toBe(5)
    expect(result.getFullYear()).toBe(2023)
  })

  it('should handle month change correctly', () => {
    const date = new Date(2023, 2, 1)
    const result = getDifferenceDatein24h(date)

    expect(result.getDate()).toBe(28)
    expect(result.getMonth()).toBe(1)
  })

  it('should handle year change correctly', () => {
    const date = new Date(2024, 0, 1)
    const result = getDifferenceDatein24h(date)

    expect(result.getDate()).toBe(31)
    expect(result.getMonth()).toBe(11)
    expect(result.getFullYear()).toBe(2023)
  })
})


