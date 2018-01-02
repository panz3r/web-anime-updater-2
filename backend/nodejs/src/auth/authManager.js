import bcrypt from 'bcrypt'
import { conformsTo, get, isNil, size, trim } from 'lodash'

import { ServerError } from '../common'
import { createTokenForUser } from './jwtUtils'

export class AuthManager {
  static async newUser(userObj) {
    const userData = this._checkUserObject(userObj)

    if (!userData) {
      throw new ServerError(422, `Invalid User Data`)
    } else {
      const { username, password } = userData
      console.log({ username, password })
      const hashedPwd = await bcrypt.hash(password, 10)
      console.log({ hashedPwd })
    }

    return true
  }

  static async login(userObj) {
    const userData = this._checkUserObject(userObj)

    if (!userData) {
      throw new ServerError(422, `Invalid User Data`)
    } else {
      const { username, password } = userData
      // TODO Authenticate user and generate his token
      return await createTokenForUser(username)
    }

    return userToken
  }

  static _checkUserObject(userObj) {
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