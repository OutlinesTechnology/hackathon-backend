const router = require('express').Router()
const usersMicroservice = require('./users')
const postsMicroservice = require('./posts')

router.use('/api/v1/user', usersMicroservice)

router.use('/api/v1/posts', postsMicroservice)

module.exports = router
