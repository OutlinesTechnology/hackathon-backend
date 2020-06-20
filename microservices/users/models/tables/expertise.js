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
  expertiseListByIds: ids => {
    return new Promise((resolve, reject) => {
      sql
        .query(`SELECT  expertise_name FROM  expertise_table WHERE id in (${ids.join(',')})`)
        .then(interestData => resolve(interestData.rows))
        .catch(e => {
          reject(e)
        })
    })
  },
}
