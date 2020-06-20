const sql = require('../')

module.exports = {
  interestList: () => {
    return new Promise((resolve, reject) => {
      sql
        .query('SELECT * from interest_table')
        .then(interestData => resolve(interestData.rows))
        .catch(_ => reject())
    })
  },
  interestListByIds: ids => {
    return new Promise((resolve, reject) => {
      sql
        .query(`SELECT interest_name FROM interest_table WHERE id in (${ids.join(',')})`)
        .then(interestData => resolve(interestData.rows))
        .catch(e => {
          reject(e)
        })
    })
  },
}
