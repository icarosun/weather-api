import { FastifyInstance } from 'fastify'
import { forecastHydrologicalDataController, addForecastHydrologicalDataController } from './forecast-hydrological-data'
import { observedHydrologicalDataController } from './observed-hydrological-data'
import { stationObservedHydrologicalDataController } from './aggregate/station-hydrological-data.ts'
import { graphicHydrologicalDataController } from './aggregate/graphic-hydrological-data.ts'

type HydrologicalDataRouteParams = {
  stationId: string
}

export async function hydrologicalDataRoutes(app: FastifyInstance) {
  app.get<{ Params: HydrologicalDataRouteParams }>(
    '/api/hydrological-data/forecast/:stationId',
    forecastHydrologicalDataController
  )
  app.post(
    '/api/hydrological-data/forecast',
    addForecastHydrologicalDataController
  )
  app.get<{ Params: HydrologicalDataRouteParams }>(
    '/api/hydrological-data/observed/:stationId',
    observedHydrologicalDataController
  )
  app.get<{ Params: HydrologicalDataRouteParams }>(
    '/api/hydrological-data/graphic/:stationId',
    graphicHydrologicalDataController
  )
  app.get(
    '/api/hydrological-data/station',
    stationObservedHydrologicalDataController
  )
}
