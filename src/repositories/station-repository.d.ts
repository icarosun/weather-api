import { Station } from '@prisma/client'

export interface StationRepository {
  findById(stationId: string): Promise<Station | null>
  getAll(): Promise<Station[]>
  getAllWithObservation(): Promise<Station[]>
}
