require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const microservices = require('./microservices')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use(microservices)
;(async function () {
  try {
    app.listen(process.env.APP_PORT, function () {
      console.log(`API Server now listening on PORT ${process.env.APP_PORT}!`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
