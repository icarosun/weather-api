import { ForecastHydrologicalDataRepository } from '@/repositories/forecast-hydrological-data-repository'

type PostForecastHydrologicalDataUseCaseRequest = {
  stationId: string,
  firstDate: string,
  lastDate: string,
  forecasts: {
    date: string, 
    elevation: number,
    flow: number
    station_id: string
  } []
}

type PostAddForecastHydrologicalDataUseCaseResponse = {
  stationId: string
  add: number
  firstDate: Date
  lastDate: Date
}


export class PostForecastHydrologicalDataUseCase {
  constructor(
    private forecastHydrologicalDataRepository: ForecastHydrologicalDataRepository,
  ) {}

  async execute(
    data: PostForecastHydrologicalDataUseCaseRequest
  ): Promise<PostAddForecastHydrologicalDataUseCaseResponse | null>
}
