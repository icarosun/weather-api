import { ClassifyClimatologicalInterpretation } from '@/domain/river/classifiy-climatological-interpretation'
import { ElevationClimatologyRepository } from '@/repositories/elevation-climatology-repository'
import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'
import { ElevationClimatologyDTO } from '@/mappers/elevation-climatoloy.mapper'
import { getDayOfYear } from '@/domain/river/date'
import { ForecastHydrologicalData } from '@prisma/client'

type GetForecastHydrologicalDataUseCaseRequest = {
  stationId: string
}

type GetForecastHydrologicalDataUseCaseResponse = {
  id: string
  date: Date
  elevation: number
  flow: number
  station_id: string
  climatologicalInterpretation: number
  low_derivation: number
  upp_derivation: number
}

export class GetForecastHydrologicalDataUseCase {
  constructor(
    private forecastHydrologicalDataRepository: ForecastHydrologicalDataRepository,
    private elevationClimatologyRepository: ElevationClimatologyRepository
  ) { }

  async execute({
    stationId,
  }: GetForecastHydrologicalDataUseCaseRequest): Promise<GetForecastHydrologicalDataUseCaseResponse[] | null> {
    const elevationForecastWithInterpretation: GetForecastHydrologicalDataUseCaseResponse[] = []

    const forecastDataArray: ForecastHydrologicalData[] =
      await this.forecastHydrologicalDataRepository.getDefaultValues(stationId)

    if (!forecastDataArray[0]) {
      return []
    }

    for await (const forecastRegister of forecastDataArray) {
      const climatologicalRegister =
        await this.elevationClimatologyRepository.findByDayAndStation({
          day: getDayOfYear(forecastRegister.date),
          stationId,
        })

      if (climatologicalRegister) {
        const elevationClimatologyDTO: ElevationClimatologyDTO = {
          percentile_between_5_and_0: climatologicalRegister?.percentile_between_5_and_0?.toNumber(),
          percentile_between_10_and_5: climatologicalRegister?.percentile_between_10_and_5?.toNumber(),
          percentile_between_15_and_10: climatologicalRegister?.percentile_between_15_and_10?.toNumber(),
          percentile_between_85_and_90: climatologicalRegister?.percentile_between_85_and_90?.toNumber(),
          percentile_between_90_and_95: climatologicalRegister?.percentile_between_90_and_95?.toNumber(),
          percentile_between_95_and_100: climatologicalRegister?.percentile_between_95_and_100?.toNumber()
        }

        const climatologicalInterpretation = ClassifyClimatologicalInterpretation({
          climatologicalValues: elevationClimatologyDTO,
          elevation: forecastRegister?.elevation?.toNumber(),
        })

        elevationForecastWithInterpretation.push({
          id: forecastRegister.id,
          date: forecastRegister.date,
          elevation: forecastRegister.elevation.toNumber(),
          low_derivation: forecastRegister.low_derivation.toNumber(),
          upp_derivation: forecastRegister.upp_derivation.toNumber(),
          flow: forecastRegister.flow.toNumber(),
          station_id: forecastRegister.station_id,
          climatologicalInterpretation,
        })
      }
    }

    return elevationForecastWithInterpretation
  }
}
