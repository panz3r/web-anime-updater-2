import dotenv from 'dotenv'
import express from 'express'
import jwt from 'express-jwt'

import { createTokenForUser } from './auth'

dotenv.config()

const apiEndpoint = '/api/v1'
const app = express()

app.use(jwt({ secret: process.env.JWT_SECRET })
  .unless({ path: [`${apiEndpoint}/login`] }))

app.post(`${apiEndpoint}/login`, (req, res) => {
  // TODO Authenticate user and generate his token
  createTokenForUser("abc123")
    .then(token => {
      res.json({ token })
    })
    .catch(err => {
      console.log('Error', err)
      // HTTP status 500: Internal Server Error
      res.status(500)
        .send('Internal Server Error')
    })
})

app.get(`${apiEndpoint}/notes`, (req, res) => {
  res.json({ notes: "This is your notebook. Edit this to start saving your notes!" })
})

app.listen(3000)