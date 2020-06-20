const jwt = require('jsonwebtoken')

module.exports = {
  jwtVerify: (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ status: false, message: 'No token provided' })
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err)
        return res.status(403).send({ status: false, message: 'Failed to authenticate token.' })
      res.locals.user_id = +decoded.user_id
      next()
    })
  },
}
