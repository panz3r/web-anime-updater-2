import { combineReducers } from 'redux'
import get from 'lodash/get'

import series from './user-series'

// CONSTANTS
const USER_LOGIN_SUCCESSFULL = 'state/user/login_successfull'
export const USER_LOGOUT = 'state/user/logout'

// ACTION CREATORS
export const userLoginSuccessfull = userToken => ({
  type: USER_LOGIN_SUCCESSFULL,
  payload: userToken
})

export { userSeriesLoaded } from './user-series'

// ACTIONS

export const userLogout = () => ({
  type: USER_LOGOUT
})

export { userSeriesLoading } from './user-series'

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
  token,
  series
})

// SELECTORS
export const getUserToken = state => get(state, 'user.token', null)

export { isLoadingUserSeries, getUserSeries } from './user-series'
