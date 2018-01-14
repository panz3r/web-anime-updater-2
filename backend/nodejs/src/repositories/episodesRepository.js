import Logger from 'pretty-logger'
import generateUUID from 'uuid/v4'

const log = Logger({
  prefix: 'EpisodesRepository'
})

export class EpisodesRepository {
  constructor(service) {
    this.service = service
  }

  async getEpisodesForSerie(id) {
    log.debug(`getEpisodesForSerie('${id}')`)
    const episodes = await this.service.getEpisodesForSerie(id)

    return episodes || []

  async addEpisodeToSerie(serieId, episode) {
    log.debug(`upsertEpisodeForSerie('${serieId}', {`, episode, `})`)
    return await this.service.addEpisodeToSerie(serieId, {
      ...episode,
      id: episode.id || generateUUID()
    })
  }
}
