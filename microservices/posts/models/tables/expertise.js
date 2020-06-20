const sql = require('../')

module.exports = {
  expertiseList: () => {
    return new Promise((resolve, reject) => {
      sql
        .query('SELECT * from expertise_table')
        .then(expertiseData => resolve(expertiseData.rows))
        .catch(_ => reject())
    })
  },
}
