import {
  Router
} from 'express'
import request from 'superagent'
import {
  HOST_ROOT
} from '../../api/config'

const router = Router()
const {
  Wechaty
} = require('wechaty')

// init
router.post('/init', async (req, res, next) => {


  Wechaty.instance() // Singleton
    .on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
    .on('login', user => console.log(`User ${user} logined`))
    .on('message', message => console.log(`Message: ${message}`))
    .start()
})

export default router
