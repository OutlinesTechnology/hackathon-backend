const sql = require('../')

module.exports = {
  createPost: postData => {
    const {
      user_id,
      type,
      title,
      ideaDescription,
      awaitedResult,
      department,
      interest,
      expertise,
      budget,
      commentBox,
    } = postData
    return new Promise((resolve, reject) => {
      sql
        .query(
          'INSERT INTO posts(user_id,type,title,idea_description,awaited_result,department,interest,expertise,budget,comment_box) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
          [
            user_id,
            type,
            title,
            ideaDescription,
            awaitedResult,
            department,
            interest,
            expertise,
            budget,
            commentBox,
          ]
        )
        .then(_ => resolve())
        .catch(_ => reject())
    })
  },
  getPosts: () => {
    return new Promise((resolve, reject) => {
      sql
        .query(
          'SELECT posts.id, posts.title, posts.comments,posts.interest,posts.expertise FROM posts INNER JOIN user_profile ON posts.user_id = user_profile.user_id'
        )
        .then(postsData => resolve(postsData.rows))
        .catch(_ => reject())
    })
  },
  getPostById: postID => {
    return new Promise((resolve, reject) => {
      sql
        .query(
          'SELECT p.id, p.type,p.title, p.idea_description, p.awaited_result, p.interest, p.expertise, p.budget, p.comment_box,p.comments, up.first_name, dt.department_name FROM posts as p  INNER JOIN user_profile as up ON p.user_id = up.user_id LEFT JOIN  department_table as dt ON dt.id = p.department WHERE p.id = $1 ',
          [postID]
        )
        .then(postData => resolve(postData.rows))
        .catch(_ => reject())
    })
  },
}
