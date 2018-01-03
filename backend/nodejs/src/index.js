import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Express from 'express'
import jwt from 'express-jwt'
import { get } from 'lodash'
import Logger from 'pretty-logger'

import { AuthManager } from './auth'
import { ExpressErrorManager } from './common'
import { MySqlDatabase } from './database'
import { SeriesRepository, UserRepository } from './datasources'

// Load .env
dotenv.config()

// Global constants
const serverPort = process.env.SERVICE_PORT || 3000
const apiEndpoint = '/api/v1'

// Logger
const log = new Logger({
  prefix: 'Express App'
})

// Database
const mysqlDatabase = new MySqlDatabase()

// Datasources
const seriesRepository = new SeriesRepository(mysqlDatabase)
const userRepository = new UserRepository(mysqlDatabase)

// Managers
const errorManager = new ExpressErrorManager(log)
const authManager = new AuthManager(userRepository)

// Configure Express (init, middlewares, etc.)
const app = Express()

app.use(jwt({ secret: process.env.JWT_SECRET }) // Support JWT authentication
  .unless({
    path: [
      `${apiEndpoint}/register`,
      `${apiEndpoint}/login`
    ]
  }))

app.use(bodyParser.json()); // Support parsing of application/json type post data

// Define endpoints
app.post(`${apiEndpoint}/register`, (req, res) => {
  authManager.newUser(get(req, 'body', {}))
    .then(() => {
      res.sendStatus(201)
    })
    .catch(err => {
      errorManager.sendError(res, err)
    })
})

app.post(`${apiEndpoint}/login`, (req, res) => {
  authManager.login(get(req, 'body', {}))
    .then(token => {
      res.json({ token })
    })
    .catch(err => {
      errorManager.sendError(res, err)
    })
})

app.get(`${apiEndpoint}/me`, (req, res) => {
  authManager.getUserInfo(get(req, 'user.user'))
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      errorManager.sendError(res, err)
    })
})

// Start Express server
log.info(`Starting server on port ${serverPort}...`)
const server = app.listen(serverPort, function (err) {
  const { address, port } = server.address()
  if (err) {
    log.error(`Unable to listen on port ${port}`, error)
    process.exit(1)
  }

  log.info(`Server listening at http://${address}:${port}`)
});