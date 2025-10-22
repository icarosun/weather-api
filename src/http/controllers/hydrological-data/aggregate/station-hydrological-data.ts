import { StationRepositoryImpl } from '@/repositories/prisma/station-repository-impl'
import { ElevationClimatologyRepositoryImpl } from '@/repositories/prisma/elevation-climatology-repository-impl'
import { ObservedHydrologicalDataRepositoryImpl } from '@/repositories/prisma/observed-hydrological-data-repository-impl'
import { GetLastObservedHydrologicalDataUseCase } from '@/use-cases/get-last-observed-hydrological-data'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function stationObservedHydrologicalDataController(
  request: FastifyReply,
  reply: FastifyReply
) {
  const stationRepositoryImpl = new StationRepositoryImpl()

  const stations = await stationRepositoryImpl.getAll();

  const getObservedHydrologicalDataUseCase = 
    new GetLastObservedHydrologicalDataUseCase(
      new ObservedHydrologicalDataRepositoryImpl(),
      new ElevationClimatologyRepositoryImpl()
    );

  const response = []

  for (const station of stations) {
    var observedHydrologicalData = await getObservedHydrologicalDataUseCase.execute({ stationId: station.id })

    response.push({
      ...station,
      latitude: station.latitude.toNumber(),
      longitude: station.longitude.toNumber(),
      ...observedHydrologicalData
    })
  }

  return reply.status(200).send(response)
}
