import Cloudscraper from 'cloudscraper'

export class CloudscraperES6 {
  static async get(url) {
    return new Promise((resolve, reject) => {
      Cloudscraper.get(url, (err, response, body) => {
        resolve({ err, response, body })
      })
    })
  }
}
