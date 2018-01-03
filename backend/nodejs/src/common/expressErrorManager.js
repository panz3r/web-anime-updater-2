import { ServerError } from './serverError'

export class ExpressErrorManager {
  constructor(logger) {
    this.log = logger
  }

  sendError(response, err) {
    if (err instanceof ServerError) {
      const { code, status } = err
      this.log.error(`${code}: ${status}`)

      switch (code) {
        case 401:
          response.sendStatus(401) // HTTP status 401: Unauthorized
          break

        case 422:
          response.sendStatus(422) // HTTP status 422: Unprocessable Entity
          break

        default:
          response.sendStatus(500) // HTTP status 500: Internal Server Error    
      }
    } else {
      this.log.error('Generic error:', err)
      response.sendStatus(500) // HTTP status 500: Internal Server Error
    }
  }
}