import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

import { isEmail } from '../../../commons'

const styles = theme => ({
  container: {},
  textField: {},
  loginButton: {
    margin: theme.spacing.unit
  }
})

class LoginFormComponent extends Component {
  state = {
    password: '',
    passwordError: false,
    username: '',
    usernameError: false
  }

  _handleChange = name => event => {
    const { passwordError, usernameError } = this.state

    this.setState({
      [name]: event.target.value,
      passwordError: name === 'password' ? false : passwordError,
      usernameError: name === 'username' ? false : usernameError
    })
  }

  _login = event => {
    const { username, password } = this.state
    const { onSubmit } = this.props
    console.log({ username, password })

    if (!username || !password) {
      this.setState({
        passwordError: true,
        usernameError: true
      })
      return
    }

    if (!isEmail(username)) {
      this.setState({
        usernameError: true
      })
      return
    }

    this.setState({
      passwordError: false,
      usernameError: false
    })

    if (onSubmit) {
      onSubmit({ username, password })
    }
  }

  render() {
    const { classes, error, loading } = this.props
    const { password, passwordError, username, usernameError } = this.state

    return (
      <form className={classes.container}>
        <Grid container direction="column" justify="space-around" spacing={24}>
          <Grid item>
            <TextField
              className={classes.textField}
              disabled={loading}
              error={usernameError || error}
              fullWidth
              label="Email"
              onChange={this._handleChange('username')}
              required
              type="email"
              value={username}
            />
          </Grid>

          <Grid item>
            <TextField
              className={classes.textField}
              disabled={loading}
              error={passwordError || error}
              fullWidth
              label="Password"
              onChange={this._handleChange('password')}
              required
              type="password"
              value={password}
            />
          </Grid>

          <Grid item>
            {!loading ? (
              <Button
                color="primary"
                className={classes.loginButton}
                onClick={this._login}
                raised
              >
                Login
              </Button>
            ) : (
              <CircularProgress
                className={classes.progress}
                size={47}
                thickness={5}
              />
            )}
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withStyles(styles)(LoginFormComponent)
