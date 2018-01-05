import bcrypt from 'bcrypt'
import { conformsTo, get, isNil, omit, size, trim } from 'lodash'
import Logger from 'pretty-logger'

import { ServerError } from '../../common'
import { createTokenForUser } from './jwtUtils'

const log = Logger({
  prefix: 'AuthManager'
})

export class AuthManager {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async newUser(userObj) {
    const userData = this._checkUserObject(userObj)

    if (!userData) {
      throw new ServerError(422, `Invalid User Data`)
    } else {
      const { username, password } = userData

      const existingUser = await this.userRepository.findUserByName(username)
      if (!existingUser) {
        const hashedPwd = await bcrypt.hash(password, 10)

        try {
          await this.userRepository.createUser({ username, password: hashedPwd })
        } catch (err) {
          log.error('Error creating a new user:', err)
          throw new ServerError(500, `Internal Server Error`)
        }
      } else {
        throw new ServerError(422, `User already exists`)
      }
    }

    return true
  }

  async login(userObj) {
    const userData = this._checkUserObject(userObj)
    if (!userData) {
      throw new ServerError(422, `Invalid User Data`)
    }

    const { username, password } = userData

    const existingUser = await this.userRepository.findUserByName(username)
    if (!existingUser) {
      // Not a 404 to avoid giving hints about registered users
      throw new ServerError(401, `User not found`)
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordMatch) {
      throw new ServerError(401, `Password did not match`)
    }

    return await createTokenForUser(existingUser.id)
  }

  async getUserInfo(userId) {
    if (isNil(userId) && size(trim(userId)) === 0) {
      throw new ServerError(422, `Invalid User ID`)
    }

    const existingUser = await this.userRepository.findUserById(userId)
    if (!existingUser) {
      // Not a 404 to avoid giving hints about registered users
      throw new ServerError(401, `User not found`)
    }

    return omit(existingUser, ['id', 'password'])
  }

  _checkUserObject(userObj) {
    const isValidUserObj = conformsTo(userObj, {
      username: username => !isNil(username) && size(trim(username)) > 0,
      password: password => !isNil(password) && size(trim(password)) > 0
    })

    if (isValidUserObj) {
      const { username, password } = userObj
      return {
        username: trim(username),
        password: trim(password)
      }
    } else {
      return null
    }
  }
}