import { ElevationClimatologyDTO } from "@/mappers/elevation-climatoloy.mapper"

export enum ClimatologyInterpretation {
  EMERGENCIA_ESTIAGEM = -3,
  ALERTA_ESTIAGEM = -2,
  ATENCAO_ESTIAGEM = -1,
  NORMALIDADE = 0,
  ATENCAO_INUNDACAO = 1,
  ALERTA_INUNDACAO = 2,
  EMERGENCIA_INUNDACAO = 3
}

export type ClassifyClimatologicalInterpretationProps = {
  elevation: number,
  climatologicalValues: ElevationClimatologyDTO
}

export function ClassifyClimatologicalInterpretation(
  { elevation, climatologicalValues }: ClassifyClimatologicalInterpretationProps
): ClimatologyInterpretation {
  let interpretation: ClimatologyInterpretation = 0;

  if (elevation < climatologicalValues!.percentile_between_95_and_100) {
    interpretation = ClimatologyInterpretation.EMERGENCIA_ESTIAGEM
  } else if (
    elevation >= climatologicalValues!.percentile_between_95_and_100 &&
    elevation < climatologicalValues!.percentile_between_90_and_95
  ) {
    interpretation = ClimatologyInterpretation.ALERTA_ESTIAGEM
  } else if (
    elevation >= climatologicalValues!.percentile_between_90_and_95 &&
    elevation < climatologicalValues!.percentile_between_85_and_90
  ) {
    interpretation = ClimatologyInterpretation.ATENCAO_ESTIAGEM
  } else if (
    elevation >= climatologicalValues!.percentile_between_85_and_90 &&
    elevation < climatologicalValues!.percentile_between_15_and_10
  ) {
    interpretation = ClimatologyInterpretation.NORMALIDADE
  } else if (
    elevation >= climatologicalValues!.percentile_between_15_and_10 &&
    elevation < climatologicalValues!.percentile_between_10_and_5
  ) {
    interpretation = ClimatologyInterpretation.ATENCAO_INUNDACAO
  } else if (
    elevation >= climatologicalValues!.percentile_between_10_and_5 &&
    elevation < climatologicalValues!.percentile_between_5_and_0
  ) {
    interpretation = ClimatologyInterpretation.ALERTA_INUNDACAO
  } else if (
    elevation >= climatologicalValues!.percentile_between_5_and_0
  ) {
    interpretation = ClimatologyInterpretation.EMERGENCIA_INUNDACAO
  }

  return interpretation
}

