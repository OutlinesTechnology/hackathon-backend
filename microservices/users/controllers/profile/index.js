const USER_PROFILE = require('../../models/tables/user_profile')
const INTEREST = require('../../models/tables/interest')
const EXPERTISE = require('../../models/tables/expertise')

module.exports = {
  getUserProfile: async (req, res) => {
    const user_id = res.locals.user_id
    const userData = await USER_PROFILE.getProfile(user_id)
      .then(userData => {
        return {
          status: true,
          data: userData,
        }
      })
      .catch(_ => {
        return {
          status: false,
          message: 'Server troubles',
        }
      })
    if (userData.status) {
      const { interests, expertises } = userData.data
      const interestData = await INTEREST.interestListByIds(interests)
        .then(interestData => {
          return {
            status: true,
            interestData,
          }
        })
        .catch(_ => {
          return {
            status: false,
            message: 'Server troubles',
          }
        })
      if (interestData) {
        const expertiseData = await EXPERTISE.expertiseListByIds(expertises)
          .then(expertiseData => {
            return {
              status: true,
              expertiseData,
            }
          })
          .catch(_ => {
            return {
              status: false,
              message: 'Server troubles',
            }
          })
        if (expertiseData) {
          const { first_name, department_name } = userData.data
          return res.status(200).json({
            status: true,
            message: 'Success',
            data: {
              firstName: first_name,
              departmentName: department_name,
              expertises: expertiseData.expertiseData.map(expertise => expertise.expertise_name),
              interests: interestData.interestData.map(interest => interest.interest_name),
            },
          })
        } else {
          return res.status(500).json({
            status: false,
            message: 'Server trouble in profile request',
          })
        }
      } else {
        return res.status(500).json({
          status: false,
          message: 'Server trouble in interest request',
        })
      }
    } else {
      return res.status(500).json({
        status: false,
        message: 'Server trouble in expertise request',
      })
    }
  },
}
