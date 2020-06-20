const jwt = require('jsonwebtoken')

module.exports = {
  jwtAuthCreate: (req, res) => {
    const token = jwt.sign({ user_id: res.locals.user_id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    })
    res.status(200).json({
      status: true,
      message: 'Successfuly auth',
      data: {
        token: token,
      },
    })
  },
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
