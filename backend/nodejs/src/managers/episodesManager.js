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
}
