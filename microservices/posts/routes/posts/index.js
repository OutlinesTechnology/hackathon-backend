const router = require('express').Router()

const postsController = require('../../constollers/posts')

const { jwtVerify } = require('../../validate')

router.post('/', jwtVerify, postsController.createNewPost)
router.get('/', postsController.listedPosts)
router.get('/filtr/:departmentName', postsController.listedPostByFiltr)
router.get('/:postId', postsController.listedPostById)

module.exports = router
