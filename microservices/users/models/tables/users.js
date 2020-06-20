const sql = require('../index')

module.exports = {
  createUser: userData => {
    const { firstName, password, email, deparmentName } = userData
    return new Promise((resolve, reject) => {
      sql
        .query(
          'INSERT INTO users (firstname, email, department_name, password) VALUES($1,$2,$3,$4)',
          [firstName, email, deparmentName, password]
        )
        .then(_ => {
          resolve()
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
