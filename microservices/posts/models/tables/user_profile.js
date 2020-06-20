const sql = require('../')

module.exports = {
  getSurnamesFirstNamesByIds: ids => {
    return new Promise((resolve, reject) => {
      sql
        .query(`SELECT surname,first_name,user_id FROM user_profile WHERE user_id in (${ids.join(',')})`)
        .then(data => resolve(data.rows))
        .catch(_ => reject())
    })
  },
}
