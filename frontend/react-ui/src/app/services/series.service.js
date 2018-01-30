export class SeriesService {
  getAllSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 'id-test-1',
            title: 'Test1',
            url: 'http://www.anime1.com/test-1',
            posterUrl: 'http://via.placeholder.com/150x350'
          },
          {
            id: 'id-test-2',
            title: 'Test2',
            url: 'http://www.anime1.com/test-1',
            posterUrl: 'http://via.placeholder.com/250x450'
          },
          {
            id: 'id-test-3',
            title: 'Test3',
            url: 'http://www.anime1.com/test-1',
            posterUrl: 'http://via.placeholder.com/200x400'
          }
        ])
      }, 1500)
    })
  }

  getUserSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 'id-test-2',
            title: 'Test2',
            url: 'http://www.anime1.com/test-1',
            posterUrl: 'http://via.placeholder.com/250x450'
          }
        ])
      }, 1500)
    })
  }
}
