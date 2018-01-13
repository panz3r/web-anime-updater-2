import Cheerio from 'cheerio'
import {
  capitalize,
  each,
  get,
  last,
  map,
  parseInt,
  replace,
  set,
  size,
  split,
  trim
} from 'lodash'
import { Duration } from 'luxon'
import Logger from 'pretty-logger'

import { Cloudscraper } from './utils'

const log = Logger({
  prefix: 'Anime1Scraper'
})

export class Anime1Scraper {
  constructor(seriesManager, episodesManager) {
    this.sm = seriesManager
    this.em = episodesManager
  }

  start() {
    const scheduleTimer = get(process, 'env.SCRAPERS_INTERNVAL', 15) * 60 * 1000 // Every 15 minutes
    log.info(
      `Scheduled execution every ${Duration.fromMillis(scheduleTimer).as(
        'minutes'
      )} minutes`
    )
    setInterval(this._updateTask, scheduleTimer)
  }

  async _updateTask() {
    log.info(`Update task started for Anime1 scraper...`)

    const series = await this.sm.getAllSeries()
    each(series, async serie => {
      const updatesData = await this._scrapeSite(get(serie, 'url'))
      if (updatesData) {
        // Update serie details on DB
        const serieTitle = get(updatesData, 'serie.title')
        await this.sm.updateSerie(serie.id, {
          ...serie,
          title: serieTitle,
          posterUrl: get(updatesData, 'serie.posterUrl')
        })
        log.info(`Updated '${serieTitle || series.title}' serie details`)

        // Update episodes details on DB
        each(updatesData.episodes, e => {
          console.log({ e })
        })
      }
    })
  }

  async _scrapeSite(pageUri) {
    const scrapedData = {
      serie: {
        title: undefined,
        posterUrl: undefined
      },
      episodes: []
    }

    if (!pageUri.startsWith('http://www.anime1.com')) {
      log.debug(`Anime1Scraper NOT fit for '${pageUri}' url. Won't scrape it.`)
      return
    }

    log.info(`Scraping page at '${pageUri}'...`)

    // Scrape Anime1 page
    const { err, response, body } = await Cloudscraper.get(pageUri)
    if (err) {
      log.error(`Failed to fetch '${pageUri}'`, err)
      return
    }

    const page = Cheerio.load(body)

    // Serie title
    const seriesTitleElems = page('.anime > .detail-left > h1.blue-main-title')
    const seriesTitle =
      size(seriesTitleElems) > 0 ? trim(seriesTitleElems.eq(0).text()) : undefined
    set(scrapedData, 'serie.title', seriesTitle)

    // Series poster
    let posterUrl = undefined
    try {
      const seriesPosterElems = page('.anime > .detail-cover')
      if (size(seriesPosterElems) > 0) {
        posterUrl = seriesPosterElems
          .eq(0)
          .find('img')
          .eq(0)
          .attr('src')

        set(scrapedData, 'serie.posterUrl', posterUrl)
      }
    } catch (err) {
      log.error(`Couldn't find Serie poster`, err)
    }

    // Episodes
    const episodesLink = page('ul.anime-list > li > a')
    log.debug(`Found ${size(episodesLink)} links`)
    const episodes = {}
    episodesLink.each((i, elem) => {
      const href = get(elem, 'attribs.href', '')
      const title = last(split(href, '/'))
      set(episodes, title, {
        number: parseInt(replace(title, 'episode-', '')),
        title: capitalize(replace(title, '-', ' ')),
        url: href
      })
    })

    log.info(`Found ${size(episodes)} episodes for '${seriesTitle}' serie.`)

    set(
      scrapedData,
      'episodes',
      map(episodes, episode => ({
        number: episode.number,
        title: episode.title,
        url: episode.url
      }))
    )

    return scrapedData
  }
}
