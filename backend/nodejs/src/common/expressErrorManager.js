import { ServerError } from './serverError'

export class ExpressErrorManager {
  static sendError(response, error) {
    if (error instanceof ServerError) {
      switch (error.code) {
        case 422:
          response.sendStatus(422) // HTTP status 422: Unprocessable Entity
          break

        default:
          response.sendStatus(500) // HTTP status 500: Internal Server Error    
      }
    } else {
      response.sendStatus(500) // HTTP status 500: Internal Server Error
    }
  }
}