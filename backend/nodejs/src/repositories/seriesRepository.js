import { size } from 'lodash'
import Logger from 'pretty-logger'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'SeriesRepository'
})

export class SeriesRepository {
  constructor(service) {
    this.service = service
  }

  async getAllSeries() {
    log.debug(`getAllSeries()`)
    const series = await this.service.getSeries()
    log.debug(`Retrieved all series:`, size(series))
    return series || []
  }

  async getSeriesForUser(id) {
    log.debug(`getSeriesForUser('${id}')`)
    const series = await this.service.getSeriesForUser(id)
    log.debug(`Retrieved user series:`, size(series))
    return series || []
  }

  async addSeriesForUser(id, serie) {
    log.debug(`addSeriesForUser('${id}', {`, serie, '})')
    return await this.service.addSerieToUser(id, {
      id: generateUUID(),
      ...serie
    })
  }
}
