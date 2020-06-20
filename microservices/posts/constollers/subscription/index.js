const POSTS = require('../../models/tables/posts')

module.exports = {
  subscribe: async (req, res) => {
    const user_id = res.locals.user_id
    const { postId } = req.body
    const subscribeResult = await POSTS.userSubscribe(user_id, postId)
      .then(_ => true)
      .catch(_ => false)
    if (subscribeResult) {
      return res.status(200).json({
        status: true,
        message: 'Success',
      })
    } else {
      return res.status(500).json({
        status: false,
        message: 'Server troubles in posts service',
      })
    }
  },
}
