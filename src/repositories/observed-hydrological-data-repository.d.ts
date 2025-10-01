import { Prisma, ObservedHydrologicalData } from '@prisma/client'

export interface ObservedHydrologicalDataRepository {
  create(data: Prisma.ObservedHydrologicalDataUncheckedCreateInput): Promise<ObservedHydrologicalData>
  getLast(stationId: string): Promise<ObservedHydrologicalData | null>
  getPreviousDayData(stationId: string, previousDay: string): Promise<ObservedHydrologicalData | null>
}
