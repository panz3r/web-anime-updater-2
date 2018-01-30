import { combineReducers } from 'redux'
import get from 'lodash/get'

import { USER_LOGOUT } from '../user'

// ACTIONS
const SERIE_LIST_LOADING = 'state/serie/list_loading'
const SERIE_LIST_LOADING_DONE = 'state/serie/list_loading_done'

// ACTION CREATORS
export const serieListLoading = () => ({
  type: SERIE_LIST_LOADING
})

export const serieListLoaded = series => ({
  type: SERIE_LIST_LOADING_DONE,
  payload: series
})

// REDUCERS
const list = (state = [], { type, payload }) => {
  switch (type) {
    case SERIE_LIST_LOADING:
    case USER_LOGOUT:
      return []

    case SERIE_LIST_LOADING_DONE:
      return [].concat(payload)

    default:
      return state
  }
}

const loading = (state = false, { type, payload }) => {
  switch (type) {
    case SERIE_LIST_LOADING:
      return true

    case USER_LOGOUT:
    case SERIE_LIST_LOADING_DONE:
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
export const getSerieList = state => get(state, 'series.list', [])

export const isLoadingSerieList = state => get(state, 'series.loading', false)
