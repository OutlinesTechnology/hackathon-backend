const { Pool } = require('pg')

const pool = new Pool()

setInterval(() => {
  pool.query('SELECT 1')
}, 10000)

module.exports = pool
