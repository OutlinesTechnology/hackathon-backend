const router = require('express').Router()

const authRoute = require('./auth')

const signupRoute = require('./signup')

const interestExpertiseRoute = require('./interestExpertise')

const profileRoute = require('./profile')

const { jwtVerify } = require('../validate')

router.use('/auth', authRoute)

router.use('/signup', signupRoute)

router.use('/interest_expertise_list', interestExpertiseRoute)

router.use('/profile', jwtVerify, profileRoute)

module.exports = router
