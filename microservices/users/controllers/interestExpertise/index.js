const INTEREST = require('../../models/tables/interest')
const EXPERTISE = require('../../models/tables/expertise')
const DEPARTMENT = require('../../models/tables/department')

module.exports = {
  expertiseandInterestList: async (req, res) => {
    const interest = await INTEREST.interestList().catch(_ => false)
    if (!interest) {
      return res.status(500).json({
        status: false,
        message: 'Server troubles',
      })
    }
    const expertise = await EXPERTISE.expertiseList().catch(_ => false)
    if (!expertise) {
      return res.status(500).json({
        status: false,
        message: 'Server troubles',
      })
    }
    const department = await DEPARTMENT.departmentList().catch(_ => false)
    if (!department) {
      return res.status(500).json({
        status: false,
        message: 'Server troubles',
      })
    }
    return res.status(200).json({
      status: true,
      message: 'Successfuly retrive expertise/interest',
      data: { interest, expertise, department },
    })
  },
}
