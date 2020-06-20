const sql = require('../')
module.exports = {
  newComment: commentData => {
    const { user_id, content } = commentData
    return new Promise((resolve, reject) => {
      sql
        .query('INSERT INTO comments(user_id, content) VALUES($1,$2) RETURNING id', [
          user_id,
          content,
        ])
        .then(comment => {
          const commentId = comment.rows[0].id
          const { postId } = commentData
          sql
            .query('UPDATE posts set comments = array_append(comments, $1) WHERE id = $2', [
              commentId,
              postId,
            ])
            .then(_ => resolve())
            .catch(_ => reject())
        })
        .catch(e => {
          console.log(e)
          reject()
        })
    })
  },
  commentsList: () => {
    return new Promise((resolve, reject) => {
      sql
        .query(
          'SELECT comments.*, user_profile.first_name FROM comments INNER JOIN user_profile ON comments.user_id = user_profile.user_id'
        )
        .then(commentsData => resolve(commentsData.rows))
        .catch(_ => reject())
    })
  },
}
