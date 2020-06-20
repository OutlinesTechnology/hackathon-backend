const router = require('express').Router()

const postsRoutes = require('./posts')
const commentRoutes = require('./comments')
const voteRoutes = require('./votes')

router.use('/', postsRoutes)

router.use('/comment', commentRoutes)

router.use('/vote', voteRoutes)

router.use('/subscription')

module.exports = router
