import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { ForecastHydrologicalDataRepositoryImpl } from '@/repositories/prisma/forecast-hydrological-data-repository-impl'
import { GetLastObservedHydrologicalDataUseCase } from '@/use-cases/get-last-observed-hydrological-data'
import { FastifyReply, FastifyRequest } from 'fastify'

type GraphicHydrologicalDataControllerRouteParams = {
  stationId: string
}

export async function graphicHydrologicalDataController(
  request: FastifyRequest<{
    Params: GraphicHydrologicalDataControllerRouteParams
  }>,
  reply: FastifyReply
) {
  const stationId = request.params.stationId

  const observedHydrologicalDataRepositoryImpl = new ObservedHydrologicalDataRepositoryImpl()
  const forecastHydrologicalDataRepositoryImpl = new ForecastHydrologicalDataRepositoryImpl()

  const observedHydrologicalData = await observedHydrologicalDataRepositoryImpl.getLast(stationId)

  const startDate = observedHydrologicalData!.date

  startDate.setUTCDate(startDate.getUTCDate() - 10)

  const response = []

  for (let i = 0; i < 20; i += 1) {
    const currentDate = new Date(startDate)
    currentDate.setUTCDate(startDate.getUTCDate() + i)

    const castDay = `${currentDate.toISOString().slice(0, 11)}07:00:00.000Z`

    let observed = null;
    let forecast = null;

    if (i < 11) {
      const observedData = await observedHydrologicalDataRepositoryImpl.getDataByDate(stationId, currentDate)
      observed = observedData ? observedData.elavation : null
    }

    const forecastData = await forecastHydrologicalDataRepositoryImpl.getDataByDate(stationId, castDay)
    forecast = forecastData ? forecastData.elevation : null

    response.push({
      date: currentDate.toISOString(),
      observed,
      forecast
    })
  }

  return reply.status(200).send(response) 
}
