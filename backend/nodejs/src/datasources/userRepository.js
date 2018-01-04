import Logger from 'pretty-logger'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'UserRepository'
})

export class UserRepository {
  constructor(database) {
    this.db = database
  }

  async findUserById(id) {
    log.debug(`findUserById('${id}')`)
    return await this.db.getUserById(id)
  }

  async findUserByName(username) {
    log.debug(`findUserByName('${username}')`)
    return await this.db.getUserByName(username)
  }

  async createUser(newUser) {
    log.debug(`createUser({ ${newUser} })`)
    const { username, password } = newUser
    return await this.db.addUser({ id: generateUUID(), username, password })
  }
}
