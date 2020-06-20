const router = require('express').Router()

const commentCotroller = require('../../constollers/comments')

const { jwtVerify } = require('../../validate')

router.post('/', jwtVerify, commentCotroller.newComment)

module.exports = router
