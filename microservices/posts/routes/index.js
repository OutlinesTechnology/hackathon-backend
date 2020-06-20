const router = require('express').Router()

const postsRoutes = require('./posts')

router.use('/', postsRoutes)

module.exports = router
