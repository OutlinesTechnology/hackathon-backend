const router = require('express').Router()

const voteController = require('../../constollers/votes')

const { jwtVerify } = require('../../validate')

router.post('/', jwtVerify, voteController.doVote)

module.exports = router
