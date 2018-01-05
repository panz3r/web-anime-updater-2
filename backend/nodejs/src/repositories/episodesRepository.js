import Logger from 'pretty-logger'

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
  }
}
