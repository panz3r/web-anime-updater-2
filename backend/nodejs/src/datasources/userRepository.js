import Logger from 'pretty-logger'
import Sequelize from 'sequelize'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'UserRepository'
})

export class UserRepository {
  constructor(database) {
    this.db = database
  }

  async findUserById(id) {
    const user = await this.db.getUserModel().findOne({
      where: {
        id
      }
    })

    return user ? user.get({ plain: true }) : undefined
  }

  async findUserByName(username) {
    const user = await this.db.getUserModel().findOne({
      where: {
        username
      }
    })

    return user ? user.get({ plain: true }) : undefined
  }

  async createUser(newUser) {
    const { username, password } = newUser
    return await this.db.getUserModel().create({ id: generateUUID(), username, password })
  }
}