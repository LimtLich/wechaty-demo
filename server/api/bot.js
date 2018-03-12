import {
  Router
} from 'express'
import request from 'superagent'
import {
  HOST_ROOT
} from '../../api/config'
const router = Router()
let qrCode = null;
const {
  Wechaty,
  Room
} = require('wechaty')

const bot = Wechaty.instance({
  profile: 'WECHATY_PROFILE'
})
bot
  .on('logout', user => log.info('Bot', `${user.name()} logouted`))
  .on('login', user => {
    console.log('Bot', `${user.name()} login`)
    bot.say('Wechaty login').catch(console.error)
  })
  .on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
      const loginUrl = url.replace(/\/qrcode\//, '/l/')
      // QrcodeTerminal.generate(loginUrl)
    }
    qrCode = url

    // res.json(url)
    console.log(`${url}\n[${code}] Scan QR Code above url to log in: `)
  })
bot.start()

// init
router.get('/init', async (req, res, next) => {
  let self = this
  if (!bot.logonoff()) {
    if (self.checkCode) {
      clearInterval(self.checkCode)
    }
    self.checkCode = setInterval(function () {
      if (qrCode) {
        clearInterval(self.checkCode)
        res.json(qrCode)
      }
    }, 1000)
  } else {
    res.json()
  }
})

//get rooms
router.get('/getUserInfo', async (req, res, next) => {
  let self = this
  if (self.checkLogin) {
    clearInterval(self.checkLogin)
  }
  self.checkLogin = setInterval(function () {
    if (bot.logonoff()) {
      clearInterval(self.checkLogin)
      const user = bot.self()
      res.json(user)
      // setTimeout(async function () {
      //   const user = bot.self()
      //   const roomList = await Room.findAll()
      //   res.json({
      //     user: user.name(),
      //     roomList
      //   })
      // }, 10 * 1000)
    }
    console.log(bot.logonoff())
  }, 1000)
})

// say
router.post('/sendText', async (req, res, next) => {
  const message = req.body.message
  bot.say(message)
  // bot.logout()
  res.json("success")
})

// say
router.post('/sendMedia', async (req, res, next) => {
  // bot.say('666')
  const imgUrl = req.body.url
  console.log(imgUrl)
  bot.say(new MediaMessage(imgUrl))
  // bot.logout()
  res.json("success")
})

// say
router.get('/logout', async (req, res, next) => {
  bot.logout()
  res.json("success")
})

export default router
