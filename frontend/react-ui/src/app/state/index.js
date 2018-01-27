import { combineReducers, compose, createStore } from 'redux'

import user from './user'

const reducers = combineReducers({
  user
})

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default createStore(reducers, {}, composeEnhancers())
