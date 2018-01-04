import Logger from 'pretty-logger'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'SeriesRepository'
})

export class SeriesRepository {
  constructor(database) {
    this.db = database
  }

  async getSeriesForUser(id) {
    log.debug(`getSeriesForUser('${id}')`)
    const user = await this.db.getUserWithSeriesById(id)
    log.debug(`Retrieved user:`, user)
    return user.series || []
  }

  async addSeriesForUser(id, serie) {
    log.debug(`addSeriesForUser('${id}', {`, serie, '})')
    return await this.db.addSerieToUser(id, { id: generateUUID(), ...serie })
  }
}
