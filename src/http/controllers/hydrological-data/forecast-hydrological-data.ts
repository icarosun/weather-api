import { ElevationClimatologyRepositoryImpl } from '@/repositories/prisma/elevation-climatology-repository-impl'
import { ForecastHydrologicalDataRepositoryImpl } from '@/repositories/prisma/forecast-hydrological-data-repository-impl'
import { GetForecastHydrologicalDataUseCase } from '@/use-cases/get-forecast-hydrological-data'
import { PostForecastHydrologicalDataUseCase } from '@/use-cases/post-forecast-hydrological-data'
import { FastifyReply, FastifyRequest } from 'fastify'

type ForecastHydrologicalDataControllerRouteParams = {
  stationId: string
}

export async function forecastHydrologicalDataController(
  request: FastifyRequest<{
    Params: ForecastHydrologicalDataControllerRouteParams
  }>,
  reply: FastifyReply
) {
  const stationId = request.params.stationId

  const getForecastHydrologicalDataUseCase =
    new GetForecastHydrologicalDataUseCase(
      new ForecastHydrologicalDataRepositoryImpl(),
      new ElevationClimatologyRepositoryImpl()
    )

  const forecastHydrologicalData =
    await getForecastHydrologicalDataUseCase.execute({ stationId })

  return reply.status(200).send(forecastHydrologicalData)
}

type addForecastHydrologicalDataControllerRequestBody = {
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

export async function addForecastHydrologicalDataController(
  request: FastifyRequest<{
    Body: addForecastHydrologicalDataControllerRequestBody
  }>,
  reply: FastifyReply
) {
  const body = request.body

  const postForecastHydrologicalDataUseCase = 
    new PostForecastHydrologicalDataUseCase(
      new ForecastHydrologicalDataRepositoryImpl()
    )

  const addForecastHydrologicalData = await postForecastHydrologicalDataUseCase.execute(body)

  //TODO: verify if the station exist 

  //TODO: verify the error case
  
  //TODO: delete previous forecasts

  return reply.status(200).send(addForecastHydrologicalData)
}
