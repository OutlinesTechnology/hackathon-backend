const sql = require('../')

module.exports = {
  departmentList: () => {
    return new Promise((resolve, reject) => {
      sql
        .query('SELECT * from department_table')
        .then(departmentData => resolve(departmentData.rows))
        .catch(_ => reject())
    })
  },
}
