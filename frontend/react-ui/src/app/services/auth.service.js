export class AuthService {
  login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject()
      }, 2000)
    })
  }
}
