const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')
const path = require('path')
const env = functions.config()

const app = express()

if (env.basic && env.basic.auth)
  app.all(
    '/*',
    basicAuth((user, password) => {
      return user === env.basic.auth.user && password === env.basic.auth.pass
    })
  )

app.use(express.static(path.join(__dirname, '/public')))

exports.app = functions.https.onRequest(app)
