const router = require('express').Router()

const { jwtAuthCreate } = require('../../validate')

const authConstoller = require('../../controllers/auth')

router.post('/', authConstoller.auth, jwtAuthCreate)

module.exports = router
