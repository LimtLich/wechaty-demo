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
  Room,
  MediaMessage
} = require('wechaty')
const fs = require('fs')
// const request = require('request')
const mkdirp = require('mkdirp')
const path = require('path')

//本地存储目录
const dir = path.join('../../static/images');

//创建目录
mkdirp(dir, function (err) {
  if (err) {
    console.log(err);
  }
});

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
  }).on('message', function (m) {
    const contact = m.from()
    const content = m.content()
    const room = m.room()

    if (/hello/.test(content)) {
      // bot.say(new MediaMessage('../../static/images/test.jpg'))
      m.say(new MediaMessage('../../static/images/demo.jpg'))
      m.say("bye.")
    }

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
  const imgUrl = req.body.url
  // var urlArr = [
  //   imgUrl
  // ];
  // var download = function (url, dir, filename) {
  //   request.head(url, function (err, res, body) {
  //     request(url).pipe(fs.createWriteStream(dir + "/" + filename));
  //   });
  // };

  // urlArr.map(function (val) {
  //   download(val, dir, 'test.jpg');
  // })
  console.log(imgUrl)
  // console.log('messageMedia:',MediaMessage)÷
  // bot.say(new MediaMessage('../../static/images/test.jpg'))
  // res.json("success")
})

// say
router.get('/logout', async (req, res, next) => {
  bot.logout()
  res.json("success")
})

export default router
