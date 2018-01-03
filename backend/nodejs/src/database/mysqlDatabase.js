import Logger from 'pretty-logger'
import Sequelize from 'sequelize'
import generateUUID from 'uuid/v4'

import { User, Series } from './models'

const log = Logger({
  prefix: 'MySqlDatabase'
})

export class MySqlDatabase {
  constructor() {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
    log.info(`Setup 'MySQLDatabase' with database '${DB_NAME}@${DB_HOST}:${DB_PORT}'`)
    this.db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      dialect: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      logging: message => { log.debug(message) },
      operatorsAliases: false
    })

    // Setup models
    this._setup()
  }

  async _setup() {
    // Check connection
    try {
      await this.db.authenticate()
      log.info('Connection to DB has been established successfully.')

      // Define models
      this.userModel = User(this.db)
      this.seriesModel = Series(this.db)

      // Define relationships
      //  - User x Series
      this.userModel.belongsToMany(this.seriesModel, { through: 'users_series' })
      this.seriesModel.belongsToMany(this.userModel, { through: 'users_series' })

      // Sync models to DB
      await this.db.sync()
      log.info(`DB synced successfully`)
    }
    catch (err) {
      log.error('Error during setup:', err)
    }
  }

  getUserModel() {
    return this.userModel
  }

  getSeriesModel() {
    return this.seriesModel
  }
}