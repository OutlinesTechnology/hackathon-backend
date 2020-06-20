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
}
