import { ObservedHydrologicalDataRepository } from '@/repositories/observed-hydrological-data-repository'
import { StationRepository } from '@/repositories/station-repository'

type ObservedHydrologicalDataProps = {
  items: {
    data_ult: string
    chuva_ult: number
    nivel_ult: number
    vazao_ult: number
  }[]
}

export class RegisterObservedHydrologicalDataUseCase {
  constructor(
    private observedHydrologicalDataRepository: ObservedHydrologicalDataRepository,
    private stationRepository: StationRepository
  ) {}

  async execute() {
    const stations = await this.stationRepository.getAll()

    for await (const station of stations) {
      try {
        const response = await fetch(
          `https://ows.snirh.gov.br/ords/servicos/hidro/mapa/${station.id}`
        )

        const observedWeatherData: ObservedHydrologicalDataProps = await response.json()

        const registerWithAcceptableCompleteness = observedWeatherData &&
        observedWeatherData.items[0].nivel_ult &&
        observedWeatherData.items[0].vazao_ult

        if (registerWithAcceptableCompleteness) {
          await this.observedHydrologicalDataRepository.create({
            date: new Date(observedWeatherData.items[0].data_ult),
            elevation: observedWeatherData.items[0].nivel_ult, // cm -> m
            flow: observedWeatherData.items[0].vazao_ult,
            accumulated_rain: observedWeatherData.items[0].chuva_ult ?? 0,
            station_id: station.id,
          })
        }
      } catch (e) {
        console.error('Error fetching data', e)
      }
    }
  }
}
