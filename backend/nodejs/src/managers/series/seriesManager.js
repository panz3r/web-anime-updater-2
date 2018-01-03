import { isNil, size, trim } from 'lodash'

import { ServerError } from '../../common/serverError'

export class SeriesManager {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async getSeriesForUser(userId) {
    if (isNil(userId) && size(trim(userId)) === 0) {
      throw new ServerError(422, `Invalid User ID`)
    }

    return this.seriesRepository.getSeriesForUser(userId)
  }
}