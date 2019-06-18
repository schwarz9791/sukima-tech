const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')
const path = require('path')
const env = process.env

const app = express()

app.all(
  '/*',
  basicAuth((user, password) => {
    return user === env.BASIC_AUTH_USER && password === env.BASIC_AUTH_PASS
  })
)

app.use(express.static(path.join(__dirname, '/public')))

exports.app = functions.https.onRequest(app)
