import { conformsTo, isNil, size, trim } from 'lodash'

import { ServerError } from '../common/serverError'

export class EpisodesManager {
  constructor(episodesRepository) {
    this.episodesRepository = episodesRepository
  }

  async getEpisodesForSerie(serieId) {
    if (isNil(serieId) || size(trim(serieId)) === 0) {
      throw new ServerError(422, `Invalid Serie ID`)
    }

    return this.episodesRepository.getEpisodesForSerie(serieId)
  }

  async addEpisodeToSerie(serieId, episodeDetails) {
    if (isNil(serieId) || size(trim(serieId)) === 0) {
      throw new ServerError(422, `Invalid Serie ID`)
    }

    const episodeData = this._checkEpisodeObject(episodeDetails)
    if (!episodeData) {
      throw new ServerError(422, `Invalid Episode object`)
    }

    return this.episodesRepository.addEpisodeToSerie(serieId, episodeData)
  }

  _checkEpisodeObject(episodeObj) {
    const isValid = conformsTo(episodeObj, {
      url: u => !isNil(u) && size(trim(u)) > 0
    })
    if (!isValid) {
      return undefined
    }

    const { id, number, title, url } = episodeObj
    return {
      id,
      number,
      title,
      url
    }
  }
}
