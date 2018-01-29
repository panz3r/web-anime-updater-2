import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getUserToken } from '../state/user'
import { connect } from 'react-redux'

const PrivateRouteComponent = ({
  component: Component,
  userToken,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      userToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const mapStateToProps = state => ({
  userToken: getUserToken(state)
})

export default connect(mapStateToProps)(PrivateRouteComponent)
