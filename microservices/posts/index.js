const router = require('express').Router()

const Routes = require('./routes')

router.use('/', Routes)

module.exports = router
