import Logger from 'pretty-logger'
import Sequelize from 'sequelize'

const log = Logger({
  prefix: 'UserRepository'
})

export class UserRepository {
  constructor() {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
    log.info(`Setup 'UserRepository' with database ${DB_NAME} at ${DB_HOST}`)
    this.db = new Sequelize(DB_NAME, 'root', 'mysql_password', {
      dialect: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      logging: false
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
      const User = this.db.define('user', {
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
      User.sync()
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

  findUserByName(username) {

  }
}