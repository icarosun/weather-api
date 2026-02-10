import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'
import { getDayOfYear, getDifferenceDatein24h } from '@/domain/river/date'
import { ElevationClimatologyDTO } from '@/mappers/elevation-climatoloy.mapper'
import { CalculateLevelRiverChange } from '@/domain/river/calculate-river-level-change'
import { ClassifyClimatologicalInterpretation } from '@/domain/river/classifiy-climatological-interpretation'

type GetLastObservedHydrologicalDataUseCaseRequest = {
  stationId: string
}

type GetLastObservedHydrologicalDataUseCaseResponse = {
  id: string
  date: Date
  elevation: number
  flow: number
  accumulated_rain: number
  station_id: string
  climatologicalInterpretation: number
  dailyVariation: number | null
}

export class GetLastObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository
  ) { }

  async execute({
    stationId,
  }: GetLastObservedHydrologicalDataUseCaseRequest): Promise<GetLastObservedHydrologicalDataUseCaseResponse | null> {
    const observedHydrologicalData =
      await this.observedHydrologicalDataRepository.getLast(stationId)

    if (!observedHydrologicalData) {
      return null
    }

    const date24hChange = getDifferenceDatein24h(observedHydrologicalData!.date)

    const previousDayObservedHydrologicalData =
      await this.observedHydrologicalDataRepository.getDataByDate(stationId, date24hChange)

    const calculateDailyVariation: number | null = CalculateLevelRiverChange({
      currentElevation: observedHydrologicalData?.elevation?.toNumber() ?? null,
      previousElevation: previousDayObservedHydrologicalData?.elevation?.toNumber() ?? null
    });

    const climatologicalRegister =
      await this.elevationClimatologyRepository.findByDayAndStation({
        day: getDayOfYear(observedHydrologicalData!.date),
        stationId,
      })

    if (!climatologicalRegister) {
      return null;
    }

    const elevationClimatologyDTO: ElevationClimatologyDTO = {
      percentile_between_5_and_0: climatologicalRegister?.percentile_between_5_and_0?.toNumber(),
      percentile_between_10_and_5: climatologicalRegister?.percentile_between_10_and_5?.toNumber(),
      percentile_between_15_and_10: climatologicalRegister?.percentile_between_15_and_10?.toNumber(),
      percentile_between_85_and_90: climatologicalRegister?.percentile_between_85_and_90?.toNumber(),
      percentile_between_90_and_95: climatologicalRegister?.percentile_between_90_and_95?.toNumber(),
      percentile_between_95_and_100: climatologicalRegister?.percentile_between_95_and_100?.toNumber()
    }


    const climatologicalInterpretation = ClassifyClimatologicalInterpretation({
      elevation: observedHydrologicalData?.elevation.toNumber(),
      climatologicalValues: elevationClimatologyDTO
    })

    return {
      id: observedHydrologicalData!.id,
      date: observedHydrologicalData!.date,
      elevation: observedHydrologicalData!.elevation.toNumber(),
      flow: observedHydrologicalData!.flow.toNumber(),
      accumulated_rain: observedHydrologicalData!.accumulated_rain.toNumber(),
      station_id: observedHydrologicalData!.station_id,
      climatologicalInterpretation,
      dailyVariation: calculateDailyVariation,
    }
  }
}
