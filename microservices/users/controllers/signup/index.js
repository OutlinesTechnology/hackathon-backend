const USER = require('../../models/tables/users')
const USER_PROFILE = require('../../models/tables/user_profile')

const bcrypt = require('bcrypt')

const { emailToken, emailVerify } = require('../../validate')

const { signupEmailVerify } = require('../../mailer')

module.exports = {
  singup: async (req, res) => {
    const userData = { email: req.body.email, password: bcrypt.hashSync(req.body.password, 10) }
    let profileData = ({ firstName, deparmentName, interest, expertise } = req.body)
    const createUserResult = await USER.createUser(userData)
      .then(user_id => {
        return { status: true, user_id }
      })
      .catch(e => {
        if (e.routine === '_bt_check_unique') {
          return { message: 'Such email already registered', status: false, code: 406 }
        } else {
          return { message: 'Server troubles', status: false, code: 500 }
        }
      })
    if (createUserResult.status) {
      profileData.user_id = createUserResult.user_id
      const createProfileResult = await USER_PROFILE.createProfile(profileData)
        .then(_ => {
          return { status: true }
        })
        .catch(e => {
          console.log(e)
          return { message: 'Server troubles', status: false, code: 500 }
        })
      if (createProfileResult.status) {
        const token = emailToken(req.body.email)
        signupEmailVerify(req.body.email, token)
        return res.status(200).json({
          status: true,
          message: 'Successfuly registration',
        })
      } else {
        return res.status(createProfileResult.code).json({
          status: false,
          message: createProfileResult.message,
        })
      }
    } else {
      return res.status(createUserResult.code).json({
        status: false,
        message: createUserResult.message,
      })
    }
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
