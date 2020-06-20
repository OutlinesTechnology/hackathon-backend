const router = require('express').Router()

const interestExpertiseController = require('../../controllers/interestExpertise')

router.get('/', interestExpertiseController.expertiseandInterestList)

module.exports = router
