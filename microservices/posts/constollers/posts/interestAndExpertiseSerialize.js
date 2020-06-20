const serialise = (postData, interestData, expertiseData) => {
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
    post.comments = post.comments ? post.comments.length : 0
  })
  return postData
}

module.exports = serialise
