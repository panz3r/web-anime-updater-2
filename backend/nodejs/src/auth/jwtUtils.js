import jwt from 'jsonwebtoken'

export function createTokenForUser(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ user: userId }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
      if (err) {
        reject(err)
      } else if (token) {
        resolve(token)
      } else {
        reject(new Error('Undefined token'))
      }
    })
  })
}