import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'
import { getClimatologicalInterpretation } from '@/utils/get-climatological-interpretation'
import { getDayOfYear } from '@/utils/get-day-of-year'
import { getDifferenceDatein24h } from '@/utils/get-difference-date-in-24h'

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
  climatologicalInterpretation: string
  dailyVariation: number | null,
}

export class GetLastObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository
  ) {}

  async execute({
    stationId,
  }: GetLastObservedHydrologicalDataUseCaseRequest): Promise<GetLastObservedHydrologicalDataUseCaseResponse|null> {
    const observedHydrologicalData =
      await this.observedHydrologicalDataRepository.getLast(stationId)

    if (!observedHydrologicalData) {
      return null
    }

    const climatologicalRegister =
      await this.elevationClimatologyRepository.findByDayAndStation({
        day: getDayOfYear(observedHydrologicalData!.date),
        stationId,
      })

    const climatologicalInterpretation = getClimatologicalInterpretation({
      climatologicalRegister: climatologicalRegister!,
      elevation: observedHydrologicalData!.elevation,
    })

    const date24hChange = getDifferenceDatein24h(observedHydrologicalData!.date)

    const previousDayObservedHydrologicalData = 
      await this.observedHydrologicalDataRepository.getDataByDate(stationId, date24hChange)

    let calculateDailyVariation = null

    if (previousDayObservedHydrologicalData) {
      calculateDailyVariation = observedHydrologicalData!.elevation - previousDayObservedHydrologicalData!.elevation
    }

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
