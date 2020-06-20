const COMMENTS = require('../../models/tables/comments')

const serialise = async (postData, interestData, expertiseData) => {
  const commentsPool = await COMMENTS.commentsList().catch(_ => false)
  postData.forEach(post => {
    let interest_names = []
    let expertise_names = []
    post.interest.forEach(id => {
      for (const name of interestData) {
        if (name.id === id) {
          interest_names.push(name.interest_name)
          break
        }
      }
    })
    post.expertise.forEach(id => {
      for (const name of expertiseData) {
        if (name.id === id) {
          expertise_names.push(name.expertise_name)
          break
        }
      }
    })
    post.interest = interest_names
    post.expertise = expertise_names
    let comments = []
    if (commentsPool && post.comments) {
      post.comments.forEach(id => {
        for (const comment of commentsPool) {
          if (comment.id === id) {
            comments.push(comment)
            break
          }
        }
      })
    }
    post.comments = comments
  })
  return postData
}

module.exports = serialise
