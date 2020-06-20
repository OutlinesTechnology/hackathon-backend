const COMMENTS = require('../../models/tables/comments')

module.exports = {
  newComment: async (req, res) => {
    const commentData = { ...req.body, user_id: res.locals.user_id }
    const commentResult = await COMMENTS.newComment(commentData)
      .then(_ => {
        return {
          status: true,
          message: 'Success',
        }
      })
      .catch(_ => {
        return {
          status: false,
          message: 'Server troubles in comments service',
        }
      })
    return res.json(commentResult)
  },
}
