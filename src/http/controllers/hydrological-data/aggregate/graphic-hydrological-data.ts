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

  const initDay = observedHydrologicalData!.date

  initDay.setUTCDate(initDay.getUTCDate() - 10)

  const response = []

  for (let i = 0; i < 20; i += 1) {
    let observed = null;
    let forecast = null;

    if (i < 11) {
      observed = await observedHydrologicalDataRepositoryImpl.getDataByDate(stationId, initDay)
    }
    const castDay = `${initDay.toISOString().slice(0, 11)}07:00:00.000Z`

    forecast = await forecastHydrologicalDataRepositoryImpl.getDataByDate(stationId, castDay)

    response.push({
      date: initDay, observed: observed!.elevation, forecast: forecast!.elevation
    })

    initDay.setUTCDate(initDay.getUTCDate() + 1)
  }

  return reply.status(200).send(response) 
}
