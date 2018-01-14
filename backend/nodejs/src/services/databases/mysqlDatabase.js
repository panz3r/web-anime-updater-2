import { map } from 'lodash'
import Logger from 'pretty-logger'
import Sequelize from 'sequelize'

import { User, Series, Episode } from './models'

const log = Logger({
  prefix: 'MySqlDatabase'
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class MySqlDatabase {
  constructor() {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
    log.info(`Setup 'MySQLDatabase' with database '${DB_NAME}@${DB_HOST}:${DB_PORT}'`)

    this.db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      dialect: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      logging: message => {
        log.debug(message)
      },
      operatorsAliases: false
    })

    // Setup models
    this._setup()
  }

  async _setup() {
    let connected = false
    while (!connected) {
      // Check connection
      try {
        await this.db.authenticate()
        log.info('Connection to DB has been established successfully.')
        connected = true
      } catch (err) {
        log.error('Error during connection:', err)
      }

      // Wait before trying to connect again
      if (!connected) {
        await sleep(2000)
      }
    }

    try {
      // Define models
      this.userModel = User(this.db)
      this.seriesModel = Series(this.db)
      this.episodeModel = Episode(this.db)

      // Define relationships
      //  - User x Series
      this.userModel.belongsToMany(this.seriesModel, {
        through: 'users_series'
      })
      this.seriesModel.belongsToMany(this.userModel, {
        through: 'users_series'
      })
      //  - Series x Episode
      this.episodeModel.belongsTo(this.seriesModel)
      this.seriesModel.hasMany(this.episodeModel)

      // Sync models to DB
      await this.db.sync()
      log.info(`DB synced successfully`)
    } catch (err) {
      log.error('Error during setup:', err)
    }
  }

  async addUser(userObj) {
    return await this.userModel.create(userObj)
  }

  async getUserById(id) {
    const user = await this.userModel.findOne({
      where: {
        id
      }
    })

    return user ? user.get({ plain: true }) : undefined
  }

  async getUserByName(username) {
    const user = await this.userModel.findOne({
      where: {
        username
      }
    })

    return user ? user.get({ plain: true }) : undefined
  }

  async getSeries() {
    const series = await this.seriesModel.findAll()

    return map(series, s => {
      const { id, title, url, posterUrl } = s.get({ plain: true })
      return {
        id,
        title,
        url,
        posterUrl
      }
    })
  }

  async getSeriesForUser(id) {
    const user = await this.userModel.findOne({ where: { id } })
    if (!user) {
      return undefined
    }

    const series = await user.getSeries()

    return map(series, ({ id, title, url, posterUrl }) => ({
      id,
      title,
      url,
      posterUrl
    }))
  }

  async addSerieToUser(userId, serieObj) {
    const user = await this.userModel.findOne({ where: { id: userId } })
    if (!user) {
      return undefined
    }

    const [newSerie, created] = await this.seriesModel.findOrCreate({
      where: { url: serieObj.url },
      defaults: { ...serieObj }
    })

    log.info(
      created ? 'New serie created.' : 'Serie already exists.',
      `Link to user '${userId}'`
    )
    return await user.addSerie(newSerie)
  }

  async updateSerie(serieId, serieDetails) {
    return await this.seriesModel.update({ ...serieDetails }, { where: { id: serieId } })
  }

  async getEpisodesForSerie(serieId) {
    const serie = await this.seriesModel.findOne({ where: { id: serieId } })
    if (!serie) {
      return undefined
    }

    return await serie.getEpisodes()
  }

  async addEpisodeToSerie(serieId, episodeObj) {
    const serie = await this.seriesModel.findOne({ where: { id: serieId } })
    if (!serie) {
      return undefined
    }

    const [newEpisode, created] = await this.episodeModel.findOrCreate({
      where: { url: episodeObj.url },
      defaults: { ...episodeObj }
    })

    log.info(
      created ? 'New episode created.' : 'Episode already exists.',
      `Link to serie '${serieId}'`
    )
    return await serie.addEpisode(newEpisode)
  }
}
