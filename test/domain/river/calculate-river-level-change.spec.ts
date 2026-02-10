import { CalculateLevelRiverChange } from '@/domain/river/calculate-river-level-change'
import { describe, it, expect } from 'vitest'

describe('CalculateLevelRiverChange', () => {
  it('should correctly calculate the river level change', () => {
    const result = CalculateLevelRiverChange({
      currentElevation: 21,
      previousElevation: 10,
    })

    expect(result).toBe(11)
  })

  it('should return a negative value when the river level decreases', () => {
    const result = CalculateLevelRiverChange({
      currentElevation: 5,
      previousElevation: 10,
    })

    expect(result).toBe(-5)

  })

  it('should return null when currentElevation is null', () => {
    const result = CalculateLevelRiverChange({
      currentElevation: null,
      previousElevation: 10,
    })

    expect(result).toBeNull()
  })

  it('should return null when previousElevation is null', () => {
    const result = CalculateLevelRiverChange({
      currentElevation: 10,
      previousElevation: null,
    })

    expect(result).toBeNull()
  })


})

