import Logger from 'pretty-logger'
import Sequelize from 'sequelize'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'UserRepository'
})

export class UserRepository {
  constructor() {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
    log.info(`Setup 'UserRepository' with database '${DB_NAME}' at '${DB_HOST}:${DB_PORT}'`)
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
      const cnn = await this.db.authenticate()
      log.info('Connection to DB has been established successfully.')

      // Define `User` model
      this.userModel = this.db.define('user', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING,
          unique: 'usernameUnique'
        },
        password: {
          type: Sequelize.STRING
        }
      })

      // Create table
      this.userModel.sync()
        .then(() => {
          log.info(`'Users' table created successfully`)
        })
        .catch(err => {
          log.error(`Could NOT create 'User' table.`, err)
        })

    } catch (err) {
      log.error('Unable to connect to the database:', err)
    }
  }

  async findUserById(id) {
    const user = await this.userModel.findOne({
      where: {
        id
      }
    })

    return user ? user.get({ plain: true }) : undefined
  }

  async findUserByName(username) {
    const user = await this.userModel.findOne({
      where: {
        username
      }
    })

    return user ? user.get({ plain: true }) : undefined
  }

  async createUser(newUser) {
    const { username, password } = newUser
    return await this.userModel.create({ id: generateUUID(), username, password })
  }
}