import { combineReducers } from 'redux'

// CONSTANTS
const USER_LOGIN_SUCCESSFULL = 'state/user/login_successfull'
const USER_LOGOUT = 'state/user/logout'

// ACTION CREATORS
export const UserLoginSuccessfull = userToken => ({
  type: USER_LOGIN_SUCCESSFULL,
  payload: userToken
})

export const UserLogout = () => ({
  type: USER_LOGOUT
})

// ACTIONS

// REDUCERS
const token = (state = null, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_SUCCESSFULL:
      return payload

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}

export default combineReducers({
  token
})
