const transport = require('./config')

const sendMail = (message_content, email) => {
  const message = {
    to: email, // List of recipients
    subject: 'Verify email', // Subject line
    html: message_content,
  }
  transport.sendMail(message)
}

module.exports = sendMail
