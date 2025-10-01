import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ObservedHydrologicalDataRepository } from '../observed-hydrological-data-repository'

export class ObservedHydrologicalDataRepositoryImpl
  implements ObservedHydrologicalDataRepository
{
  async create(data: Prisma.ObservedHydrologicalDataUncheckedCreateInput) {
    const observedHydrologicalData =
      await prisma.observedHydrologicalData.create({
        data,
      })

    return observedHydrologicalData
  }

  async getLast(stationId: string) {
    const observedHydrologicalData =
      await prisma.observedHydrologicalData.findFirst({
        where: {
          station_id: stationId,
        },
        orderBy: {
          date: 'desc',
        },
      })

    return observedHydrologicalData
  }

  async getPreviousData(stationId: string, previousDay: string) {
    const observedHydrologicalData =
      await prisma.observedHydrologicalData.findFirst({
        where: {
          station_id: stationId,
          date: previousDay
        }
      })

    return observedHydrologicalData
  }

}
