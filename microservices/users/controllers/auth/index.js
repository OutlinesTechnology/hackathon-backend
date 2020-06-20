const USER = require('../../models/tables/users')
const bcrypt = require('bcrypt')
module.exports = {
  auth: async (req, res, next) => {
    await USER.getUser(req.body.email)
      .then(async userData => {
        if (userData) {
          const equel = await bcrypt.compare(req.body.password, userData.password)
          if (equel) {
            res.locals.user_id = userData.user_id
            next()
          } else {
            return res.status(401).json({ message: 'Incorrect password', status: false })
          }
        } else {
          return res.status(404).json({ message: 'Such mail is not registered', status: false })
        }
      })
      .catch(e => {
        console.log(e)
        return res.status(500).json({ message: 'Server troubles', status: false })
      })
  },
}
