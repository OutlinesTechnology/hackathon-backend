const USER = require('../../models/tables/users')

const bcrypt = require('bcrypt')

const { emailToken, emailVerify } = require('../../validate')

const { signupEmailVerify } = require('../../mailer')

module.exports = {
  singup: async (req, res) => {
    const userData = { ...req.body, password: bcrypt.hashSync(req.body.password, 10) }
    await USER.createUser(userData)
      .then(_ => {
        const token = emailToken(req.body.email)
        signupEmailVerify(req.body.email, token)
        return res.status(200).json({ message: 'Successfully', status: true })
      })
      .catch(e => {
        if (e.routine === '_bt_check_unique') {
          return res.status(406).json({ message: 'Such email already registered', status: false })
        } else {
          return res.status(500).json({ message: 'Server troubles', status: false })
        }
      })
  },
  emailVerify: async (req, res) => {
    const token = req.params.token
    await emailVerify(token)
      .then(async email => {
        await USER.updateEmailStatus(email)
          .then(_ => {
            return res.redirect(`${process.env.SITE_URL}/email/confirm/success`)
          })
          .catch(_ => {
            return res.redirect(`${process.env.SITE_URL}`)
          })
      })
      .catch(_ => {
        return res.redirect(`${process.env.SITE_URL}/email/confirm/error`)
      })
  },
}
