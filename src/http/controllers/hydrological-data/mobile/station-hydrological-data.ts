import { StationRepositoryImpl } from '@/repositories/prisma/station-repository-impl'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function stationObservedHydrologicalDataController(
  request: FastifyReply,
  reply: FastifyReply
) {

  const stationRepositoryImpl = new StationRepositoryImpl()

  const stationWithObservedHydrological = await stationRepositoryImpl.getAllWithObservation();

  return reply.status(200).send(stationWithObservedHydrological)
}
