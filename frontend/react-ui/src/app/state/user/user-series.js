import { combineReducers } from 'redux'
import get from 'lodash/get'

import { USER_LOGOUT } from './index'

// CONSTANTS
const USER_SERIES_LOADING = 'state/user/series/loading'
const USER_SERIES_LOADED = 'state/user/series/loaded'

// ACTIONS
export const userSeriesLoading = () => ({
  type: USER_SERIES_LOADING
})

// ACTION CREATORS
export const userSeriesLoaded = series => ({
  type: USER_SERIES_LOADED,
  payload: series
})

// REDUCERS
const list = (state = [], { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return []

    case USER_SERIES_LOADED:
      return [].concat(payload)

    default:
      return state
  }
}

const loading = (state = false, { type }) => {
  switch (type) {
    case USER_LOGOUT:
    case USER_SERIES_LOADED:
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  loading
})

// SELECTORS
export const isLoadingUserSeries = state =>
  get(state, 'user.series.loading', false)

export const getUserSeries = state =>
  get(state, 'user.series.list', [])
