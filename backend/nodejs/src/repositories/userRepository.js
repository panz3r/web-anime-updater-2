import Logger from 'pretty-logger'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'UserRepository'
})

export class UserRepository {
  constructor(service) {
    this.service = service
  }

  async findUserById(id) {
    log.debug(`findUserById('${id}')`)
    return await this.service.getUserById(id)
  }

  async findUserByName(username) {
    log.debug(`findUserByName('${username}')`)
    return await this.service.getUserByName(username)
  }

  async createUser(newUser) {
    log.debug(`createUser({ ${newUser} })`)
    const { username, password } = newUser
    return await this.service.addUser({
      id: generateUUID(),
      username,
      password
    })
  }
}
