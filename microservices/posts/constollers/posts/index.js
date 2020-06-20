const POSTS = require('../../models/tables/posts')
const INTEREST = require('../../models/tables/interest')
const EXPERTISE = require('../../models/tables/expertise')
const DEPARTMENT = require('../../models/tables/department')

const serialize = require('./interestAndExpertiseSerialize')

module.exports = {
  createNewPost: async (req, res) => {
    const user_id = res.locals.user_id
    const postData = { ...req.body, user_id }
    const createPostResult = await POSTS.createPost(postData)
      .then(_ => {
        return {
          data: {
            status: true,
            message: 'Success',
          },
          code: 200,
        }
      })
      .catch(_ => {
        return {
          data: {
            status: false,
            message: 'Server troubles in post service',
          },
          code: 500,
        }
      })
    return res.status(createPostResult.code).json(createPostResult.data)
  },
  listedPosts: async (req, res) => {
    const postData = await POSTS.getPosts().catch(_ => false)
    const interestData = await INTEREST.interestList().catch(_ => false)
    const expertiseData = await EXPERTISE.expertiseList().catch(_ => false)
    const subscriptionData = await POSTS.getSubscriptions().catch(_ => false)
    console.log(subscriptionData)
    await serialize(postData, interestData, expertiseData)
    if (postData) {
      return res.status(200).json({
        status: true,
        message: 'Success',
        data: postData,
      })
    } else {
      return res.status(500).json({
        status: false,
        message: 'Server troubles in posts service',
      })
    }
  },
  listedPostById: async (req, res) => {
    const postId = req.params.postId
    const postData = await POSTS.getPostById(postId).catch(_ => false)
    const interestData = await INTEREST.interestList().catch(_ => false)
    const expertiseData = await EXPERTISE.expertiseList().catch(_ => false)
    if (postData) {
      await serialize(postData, interestData, expertiseData)
      return res.status(200).json({
        status: true,
        message: 'Success',
        data: postData,
      })
    } else {
      return res.status(500).json({
        status: false,
        message: 'Server troubles in posts service',
      })
    }
  },
  listedPostByFiltr: async (req, res) => {
    const { departmentName } = req.params
    const departmentList = await DEPARTMENT.departmentList().catch(_ => false)
    if (departmentList) {
      let departmentId
      departmentList.forEach(department => {
        if (departmentName === department.department_name) {
          departmentId = department.id
        }
      })
      const postData = await POSTS.getPostsByDepartmentId(departmentId)
      const interestData = await INTEREST.interestList().catch(_ => false)
      const expertiseData = await EXPERTISE.expertiseList().catch(_ => false)
      await serialize(postData, interestData, expertiseData)
      if (postData) {
        return res.status(200).json({
          status: true,
          message: 'Success',
          data: postData,
        })
      } else {
        return res.status(500).json({
          status: false,
          message: 'Server troubles in posts service',
        })
      }
    }
  },
}
