import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { Unsplashed } from 'react-unsplash-container'

import { AuthService } from '../../services'
import { userLoginSuccessfull } from '../../state/user'
import { LoginFormComponent } from './components'

const styles = theme => ({
  errorToast: {
    color: '#FFF',
    backgroundColor: '#FF314F'
  },
  root: {
    flexGrow: 1
  },
  mainGrid: {
    height: '100%'
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class LoginPage extends Component {
  state = {
    loading: false,
    redirectToReferrer: false
  }

  constructor(props) {
    super(props)

    this.authService = new AuthService()
  }

  _login = credentials => {
    const { userLoginSuccessfull } = this.props

    this.setState({
      error: false,
      loading: true
    })

    this.authService
      .login(credentials)
      .then(tkn => {
        userLoginSuccessfull(tkn)
        this.setState({
          loading: false,
          redirectToReferrer: true
        })
      })
      .catch(err => {
        this.setState({
          error: true,
          loading: false
        })
      })
  }

  _resetError = () => {
    this.setState({
      error: false
    })
  }

  render() {
    const { classes } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { error, loading, redirectToReferrer } = this.state

    console.log({ props: this.props })

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <Unsplashed className={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={3000}
          message="Authentication failed. Check inserted data!"
          onClose={this._resetError}
          open={error}
          SnackbarContentProps={{
            className: classes.errorToast
          }}
        />

        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.mainGrid}
          spacing={0}
        >
          <Grid item xs={10} sm={7} md={5} lg={4}>
            <Paper className={classes.paper}>
              <LoginFormComponent
                error={error}
                loading={loading}
                onSubmit={this._login}
              />
            </Paper>
          </Grid>
        </Grid>
      </Unsplashed>
    )
  }
}

const mapDispatchToProps = {
  userLoginSuccessfull
}

export default connect(undefined, mapDispatchToProps)(
  withStyles(styles)(LoginPage)
)
