import { ForecastHydrologicalData, Prisma } from '@prisma/client'

export interface ForecastHydrologicalDataRepository {
  getDefaultValues(stationId: string): Promise<ForecastHydrologicalData[]>

  create(dataArray: Prisma.ForecastHydrologicalDataUncheckedCreateInput): Promise<ForecastHydrologicalData>
  createMany(dataArray: Prisma.ForecastHydrologicalDataUncheckedCreateInput): Promise<void>
  clearAll(): Promise<void>
  getDataByDate(stationId: string, date: string): Promise<ForecastHydrologicalData | null>
}
