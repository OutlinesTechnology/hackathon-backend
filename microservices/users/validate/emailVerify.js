const jwt = require('jsonwebtoken')

module.exports = {
  emailToken: email => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET)
    return token
  },
  emailVerify: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject()
        } else {
          resolve(decoded.email)
        }
      })
    })
  },
}
