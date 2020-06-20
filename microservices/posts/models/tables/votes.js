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
        .catch(e => {
          reject(e)
        })
    })
  },
  votesList: () => {
    return new Promise((resolve, reject) => {
      sql
        .query(
          'SELECT votes.*, users.voteWeight FROM votes INNER JOIN users ON votes.user_id = users.user_id'
        )
        .then(votesData => resolve(votesData.rows))
        .catch(_ => reject())
    })
  },
}
