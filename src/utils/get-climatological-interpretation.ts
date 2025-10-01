import { ElevationClimatology } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

type GetClimatologicalInterpretationProps = {
  elevation: Decimal,
  climatologicalRegister: ElevationClimatology
}

export function getClimatologicalInterpretation(
  { elevation, climatologicalRegister }: GetClimatologicalInterpretationProps
) {
  let interpretation = ''

  if (elevation.toNumber() < climatologicalRegister!.percentile_between_95_and_100.toNumber()) {
    interpretation = '-3'
  } else if (
    elevation.toNumber() >= climatologicalRegister!.percentile_between_95_and_100.toNumber() &&
    elevation.toNumber() < climatologicalRegister!.percentile_between_90_and_95.toNumber()
  ) {
    interpretation = '-2'
  } else if (
    elevation.toNumber() >= climatologicalRegister!.percentile_between_90_and_95.toNumber() &&
    elevation.toNumber() < climatologicalRegister!.percentile_between_85_and_90.toNumber()
  ) {
    interpretation = '-1'
  } else if (
    elevation.toNumber() >= climatologicalRegister!.percentile_between_85_and_90.toNumber() &&
    elevation.toNumber() < climatologicalRegister!.percentile_between_15_and_10.toNumber()
  ) {
    interpretation = '0'
  } else if (
    elevation.toNumber() >= climatologicalRegister!.percentile_between_15_and_10.toNumber() &&
    elevation.toNumber() < climatologicalRegister!.percentile_between_10_and_5.toNumber()
  ) {
    interpretation = '1'
  } else if (
    elevation.toNumber() >= climatologicalRegister!.percentile_between_10_and_5.toNumber() &&
    elevation.toNumber() < climatologicalRegister!.percentile_between_5_and_0.toNumber()
  ) {
    interpretation = '2'
  } else if (
    elevation.toNumber() >= climatologicalRegister!.percentile_between_5_and_0.toNumber()
  ) {
    interpretation = '3'
  }

  return interpretation
}

