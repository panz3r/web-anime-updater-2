import Cheerio from 'cheerio'
import Cloudscraper from 'cloudscraper'
import {
  capitalize,
  each,
  get,
  last,
  parseInt,
  replace,
  set,
  size,
  split,
  trim
} from 'lodash'
import { Duration } from 'luxon'
import Logger from 'pretty-logger'

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
    setInterval(this._scrapeSite, scheduleTimer)
  }

  async _scrapeSite() {
    log.info(`Scraping started...`)

    const series = await this.sm.getAllSeries()
    each(series, serie => {
      const pageUri = get(serie, 'url')

      if (pageUri.startsWith('http://www.anime1.com')) {
        log.info(`Scraping page at '${pageUri}'...`)

        Cloudscraper.get(pageUri, async (err, response, body) => {
          if (err) {
            log.error(`Failed to fetch '${pageUri}'`, err)
          } else {
            const page = Cheerio.load(body)

            // Serie title
            const seriesTitleElems = page(
              '.anime > .detail-left > h1.blue-main-title'
            )
            const seriesTitle =
              size(seriesTitleElems) > 0
                ? trim(seriesTitleElems.eq(0).text())
                : undefined

            // Series poster
            let posterUrl = undefined
            try {
              const seriesPosterElems = page('.anime > .detail-cover')
              posterUrl =
                size(seriesPosterElems) > 0
                  ? seriesPosterElems
                      .eq(0)
                      .find('img')
                      .eq(0)
                      .attr('src')
                  : undefined
            } catch (err) {
              log.error(`Couldn't find Serie poster`, err)
            }

            // Update serie details
            await this.sm.updateSerie(serie.id, {
              ...serie,
              title: seriesTitle,
              posterUrl
            })
            log.info(`Updated '${seriesTitle}' serie details`)

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

            log.info(
              `Found ${size(episodes)} episodes for '${seriesTitle}' serie.`
            )
          }
        })
      }
    })
  }
}
