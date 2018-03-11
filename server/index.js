import express from 'express'
import {
  Nuxt,
  Builder
} from 'nuxt'
import bodyParser from 'body-parser'
import cors from 'cors'

import api from './api'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

// Body parser，用来封装 req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
// cors
app.use(cors())


app.use(function(req, res, next) {
  next() //otherwise continue
});

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
