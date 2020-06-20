const sql = require('../')

module.exports = {
  createUser: userData => {
    const { password, email } = userData
    return new Promise((resolve, reject) => {
      sql
        .query('INSERT INTO users (email, password) VALUES($1,$2) RETURNING user_id', [
          email,
          password,
        ])
        .then(userData => {
          resolve(userData.rows[0].user_id)
        })
        .catch(e => reject(e))
    })
  },
  getUser: email => {
    return new Promise((resolve, reject) => {
      sql
        .query('SELECT user_id, password FROM  users WHERE email = $1', [email])
        .then(userData => resolve(userData.rows[0]))
        .catch(_ => reject())
    })
  },
  updateEmailStatus: user_id => {
    return new Promise((resolve, reject) => {
      sql
        .query('UPDATE users set email_confirmed = true WHERE email = $1', [user_id])
        .then(_ => {
          resolve()
        })
        .catch(_ => {
          reject()
        })
    })
  },
}
