import Logger from 'pretty-logger'
import Sequelize from 'sequelize'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'SeriesRepository'
})

export class SeriesRepository {
  constructor(database) {
    this.db = database
  }
}