import { prisma } from '@/lib/prisma'
import { StationRepository } from '../station-repository'

export class StationRepositoryImpl implements StationRepository {
  async findById(stationId: string) {
    const station = await prisma.station.findUnique({
      where: {
        id: stationId,
      },
    })

    return station
  }

  async getAll() {
    const stations = await prisma.station.findMany()
    return stations
  }

  async getAllWithObservation() {
    const stationsAndObservation = await prisma.$queryRaw`
      SELECT
        s.id,
        s.name,
        s.latitude,
        s.longitude,
        o.elevation AS elevation,
        o.date AS date
      FROM stations s
      LEFT JOIN LATERAL (
        SELECT 
          o.elevation,
          o.date
        FROM observed_hydrological_data o
        WHERE o.station_id = s.id
        ORDER BY o.date DESC 
        LIMIT 1
      ) o ON true;
    `;

    return stationsAndObservation;
  }
}
