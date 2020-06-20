const router = require('express').Router()

const userRoutes = require('./routes')

router.use('/', userRoutes)

module.exports = router
