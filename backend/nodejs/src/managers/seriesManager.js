import { conformsTo, isNil, size, trim } from 'lodash'

import { ServerError } from '../common/serverError'

export class SeriesManager {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async newSerieForUser(userId, serieObj) {
    if (isNil(userId) || size(trim(userId)) === 0) {
      throw new ServerError(422, `Invalid User ID`)
    }

    const serieData = this._checkSerieObject(serieObj)
    if (!serieData) {
      throw new ServerError(422, `Invalid Serie object`)
    }

    return this.seriesRepository.addSeriesForUser(userId, serieData)
  }

  async getAllSeries() {
    return this.seriesRepository.getAllSeries()
  }

  async getSeriesForUser(userId) {
    if (isNil(userId) || size(trim(userId)) === 0) {
      throw new ServerError(422, `Invalid User ID`)
    }

    return this.seriesRepository.getSeriesForUser(userId)
  }

  _checkSerieObject(serieObj) {
    const isValid = conformsTo(serieObj, {
      url: u => !isNil(u) && size(trim(u)) > 0
    })
    if (!isValid) {
      return undefined
    }

    const { id, title, url, posterUrl } = serieObj
    return {
      id,
      title,
      url,
      posterUrl
    }
  }
}
