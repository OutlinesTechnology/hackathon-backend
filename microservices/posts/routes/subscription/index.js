const router = require('express').Router()

const subscriptionController = require('../../constollers/subscription')

const { jwtVerify } = require('../../validate')

router.post('/', jwtVerify, subscriptionController.subscribe)

module.exports = router
