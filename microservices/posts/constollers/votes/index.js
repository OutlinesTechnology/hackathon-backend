const VOTES = require('../../models/tables/votes')

module.exports = {
  doVote: async (req, res) => {
    const voteData = { ...req.body, user_id: res.locals.user_id }
    const voteCreateResult = await VOTES.createVote(voteData)
      .then(_ => {
        return {
          status: true,
          message: 'Success',
        }
      })
      .catch(_ => {
        return {
          status: false,
          message: 'Server trouble in vote service',
        }
      })
    return res.json(voteCreateResult)
  },
}
