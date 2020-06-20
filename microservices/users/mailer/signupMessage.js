const sender = require('./sender')

const signupEmailVerify = (email, token) => {
  const html_body = `<a target=_blank href=${process.env.APP_HOST_NAME}/api/v1/user/signup/email_verify/${token}>Click here</a>`
  sender(html_body, email)
}

module.exports = { signupEmailVerify }
