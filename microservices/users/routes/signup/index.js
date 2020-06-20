const router = require('express').Router()

const signUpController = require('../../controllers/signup')

router.post('/', signUpController.singup)
router.get('/email_verify/:token', signUpController.emailVerify)

module.exports = router
