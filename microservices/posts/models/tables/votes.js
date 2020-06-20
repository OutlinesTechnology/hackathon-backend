const sql = require('../')

module.exports = {
  createVote: voteData => {
    const { result, user_id, postId } = voteData
    return new Promise((resolve, reject) => {
      sql
        .query(
          'INSERT INTO votes(result, user_id,post_id) VALUES($1,$2,$3) ON DUPLICATE KEY UPDATE result=$4',
          [result, user_id, postId, result]
        )
        .then(_ => {
          resolve()
        })
        .catch(_ => reject())
    })
  },
}
