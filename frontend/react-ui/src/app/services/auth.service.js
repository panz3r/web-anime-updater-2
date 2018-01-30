export class AuthService {
  login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('a.fake.token')
      }, 2000)
    })
  }
}
