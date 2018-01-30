import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { CircularProgress } from 'material-ui/Progress'

import { PrivateRoute } from './commons'
import { LoginPage, MainPage, NotFoundPage } from './pages'
import { store, persistor } from './state'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<CircularProgress />} persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute path="/" component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
)

export default App
