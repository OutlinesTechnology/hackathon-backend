const router = require('express').Router()

const authRoute = require('./auth')

const signupRoute = require('./signup')

router.use('/auth', authRoute)

router.use('/signup', signupRoute)

module.exports = router
