import { describe, it, expect } from 'vitest'
import { ElevationClimatologyDTO } from '@/mappers/elevation-climatoloy.mapper'
import { ClassifyClimatologicalInterpretation, ClimatologyInterpretation } from '@/domain/river/classifiy-climatological-interpretation'

describe('ClassifyClimatologicalInterpretation', () => {
  const climatology: ElevationClimatologyDTO = {
    percentile_between_95_and_100: 1836,
    percentile_between_90_and_95: 1883.25,
    percentile_between_85_and_90: 1892,
    percentile_between_15_and_10: 2223,
    percentile_between_10_and_5: 2266.05,
    percentile_between_5_and_0: 2309,
  }

  it('should return EMERGENCIA_ESTIAGEM', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 1835,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.EMERGENCIA_ESTIAGEM)
  })

  it('should return ALERTA_ESTIAGEM', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 1836,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.ALERTA_ESTIAGEM)
  })

  it('should return ATENCAO_ESTIAGEM', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 1884,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.ATENCAO_ESTIAGEM)
  })

  it('should return NORMALIDADE', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 1892,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.NORMALIDADE)
  })

  it('should return ATENCAO_INUNDACAO', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 2223,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.ATENCAO_INUNDACAO)
  })

  it('should return ALERTA_INUNDACAO', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 2267,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.ALERTA_INUNDACAO)
  })

  it('should return EMERGENCIA_INUNDACAO', () => {
    const result = ClassifyClimatologicalInterpretation({
      elevation: 2309,
      climatologicalValues: climatology,
    })

    expect(result).toBe(ClimatologyInterpretation.EMERGENCIA_INUNDACAO)
  })
})

