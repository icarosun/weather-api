import { app } from './app'
import { registerObservedDataFactory } from './use-cases/factories/register-observed-data-factory'

registerObservedDataFactory.execute()
setInterval(() => registerObservedDataFactory.execute(), 30 * 60 * 1000)

app
  .listen({
    host: 'localhost',
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
