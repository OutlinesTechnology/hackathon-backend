const router = require('express').Router()

const postsController = require('../../constollers/posts')

router.post('/', postsController.createNewPost)
router.get('/', postsController.listedPosts)
router.get('/filtr/:departmentName', postsController.listedPostByFiltr)
router.get('/:postId', postsController.listedPostById)

module.exports = router
