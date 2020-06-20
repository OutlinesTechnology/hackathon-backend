const router = require('express').Router()
const usersMicroservic = require('./users')

router.use('/api/v1/user', usersMicroservic)

module.exports = router
