const router = require('express').Router()

const postsRoutes = require('./posts')
const commentRoutes = require('./comments')

router.use('/', postsRoutes)

router.use('/comment', commentRoutes)

module.exports = router
