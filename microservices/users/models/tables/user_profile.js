const sql = require('../')

module.exports = {
  getProfile: user_id => {
    return new Promise((resolve, reject) => {
      sql
        .query('SELECT * FROM user_profile WHERE user_id = $1', [user_id])
        .then(profileData => resolve(profileData.rows[0]))
        .catch(_ => reject())
    })
  },
  createProfile: profileData => {
    const { firstName, deparmentName, interest, expertise, user_id } = profileData
    return new Promise((resolve, reject) => {
      sql
        .query(
          'INSERT INTO user_profile (first_name, department_name, interests, expertises, user_id) VALUES($1,$2,$3,$4, $5)',
          [firstName, deparmentName, interest, expertise, user_id]
        )
        .then(_ => resolve())
        .catch(e => reject(e))
    })
  },
}
