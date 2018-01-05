import Logger from 'pretty-logger'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'SeriesRepository'
})

export class SeriesRepository {
  constructor(service) {
    this.service = service
  }

  async getSeriesForUser(id) {
    log.debug(`getSeriesForUser('${id}')`)
    const user = await this.service.getUserWithSeriesById(id)
    log.debug(`Retrieved user:`, user)
    return user.series || []
  }

  async addSeriesForUser(id, serie) {
    log.debug(`addSeriesForUser('${id}', {`, serie, '})')
    return await this.service.addSerieToUser(id, {
      id: generateUUID(),
      ...serie
    })
  }
}
