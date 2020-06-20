const router = require('express').Router()

const profileController = require('../../controllers/profile')

router.get('/', profileController.getUserProfile)

module.exports = router
