import { combineReducers, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import user from './user'

const reducers = combineReducers({
  user
})

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

// Redux Persist
const persistConfig = {
  key: 'wau2-react-ui',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, {}, composeEnhancers())
export const persistor = persistStore(store)
