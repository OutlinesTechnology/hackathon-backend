//http://localhost:3000/api/v1/user/auth
//POST

//request
interface Auth {
  email: string
  password: string
}
//response
interface AuthResponse {
  status: boolean
  message: string
  data: {
    token: string
  }
}

//-------------------------------------------------------

//http://localhost:3000/api/v1/user/signup
//POST

//request
interface SignUp {
  email: string
  password: string
  firstName: string
  deparmentName: string
  expertise: number[]
  interest: number[]
  surname: string
}
//response
interface SignUpResponse {
  status: boolean
  message: string
}

//-------------------------------------------------------

//http://localhost:3000/api/v1/user/profile
//GET
//header x-access-token --> jwt key

//request
interface profile {}
//response
interface profileResponse {
  status: boolean
  message: string
  data: {
    firstName: string
    departmentName: string
    expertises: string[]
    interests: string[]
  }
}

//-------------------------------------------------------

//http://localhost:3000/api/v1/user/interest_expertise_list
//GET

//request
interface interest_expertise_list {}
//response
interface interest_expertise_listResponse {
  status: boolean
  message: string
  data: {
    interest: {
      id: number
      interest_name: string
    }[]
    expertise: {
      id: number
      expertise_name: string
    }[]
    department: {
      id: number
      department_name: string
    }[]
  }
}

//-------------------------------------------------------

//http://localhost:3000/api/v1/posts/
//GET

//request
interface posts {}
//response
interface postsResponse {
  status: boolean
  message: string
  data: {
    id: number
    title: string
    comments: number
    interest: string[]
    expertise: string[]
    votes : number
    first_name : string
    surname : string
  }
}

//-------------------------------------------------------

//http://localhost:3000/api/v1/posts/
//POST
//header x-access-token --> jwt key

//request
interface postsCreate {
  type: string
  title: string
  ideaDescription: string
  awaitedResult: string
  department: number
  interest: number[]
  expertise: number[]
  budget: number
  commentBox: string
}
//response
interface postsCreateResponse {
  status: boolean
  message: string
}

//-------------------------------------------------------

//-------------------------------------------------------

//http://localhost:3000/api/v1/posts/:postId
//GET

//request
interface postsById {}
//response
interface postsByIdResponse {
  status: boolean
  message: string
  data: {
    id: number
    type: string
    title: string
    ideaDescription: string
    awaitedResult: string
    interest: number[]
    expertise: number[]
    budget: number
    commentBox: string
    comments: {
      id: number
      content: string
      user_id: number
      date: Date
      first_name: string
    }[]
    department_name: string
    first_name: string
    surname : string
    votes : number
  }
}
//-------------------------------------------------------

//http://localhost:3000/api/v1/posts/comment
//POST

//request
interface comment {
  postId: number
  content: string
}
//response
interface commentResponse {
  status: boolean
  message: string
}

//-------------------------------------------------------
