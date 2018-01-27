import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { LoginPage, NotFoundPage } from './pages'
import store from './state'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Provider>
)

export default App
