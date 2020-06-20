const router = require('express').Router()

const Routes = require('./routes')

const { jwtVerify } = require('./validate')

router.use('/', jwtVerify, Routes)

module.exports = router
