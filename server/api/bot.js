import {
  Router
} from 'express'
import request from 'superagent'
import {
  HOST_ROOT
} from '../../api/config'
const router = Router()
const user = require('../../db/models/user')
const record = require('../../db/models/record')
let qrCode = null;
const {
  Wechaty,
  Room,
  MediaMessage
} = require('wechaty')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

//本地存储目录
const dir = path.join(__dirname, '../../static/images');

//创建目录
mkdirp(dir, function (err) {
  if (err) {
    console.log(err);
  }
});

const bot = Wechaty.instance({
  profile: './profile/WECHATY_PROFILE'
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
  }).on('message', async m => {
    const room = m.room()
    if (room) {
      const topic = room.topic()
      console.log(`room topic is : ${topic}`)
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

//get userinfo
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
    }
    console.log(bot.logonoff())
  }, 1000)
})

//getrooms
router.get('/getRooms', async (req, res, next) => {
  // setTimeout(async function () {
  //   const roomList = await Room.findAll()
  //   res.json(roomList)
  // }, 10 * 1000)
  Room.findAll().then(function (roomList) {
    res.json(roomList.map(e => e.name = e.topic()))
  })
})

// say
router.post('/sendText', async (req, res, next) => {
  const message = req.body.message
  const rooms = req.body.rooms
  if (typeof (rooms) == "string") {
    let room = await Room.find({
      topic: rooms
    })
    await room.say(message)
    console.log('room:', room)
    record.create({
      from_name: bot.self().obj.name,
      from_uin: bot.self().obj.id,
      to_name: room.obj.topic,
      to_uin: room.obj.id,
      type: 'text',
      content: message
    })
  } else {
    for (let i = 0; i < rooms.length; i++) {
      let room = await Room.find({
        topic: rooms[i]
      })
      await room.say(message)
      record.create({
        from_name: bot.self().obj.name,
        from_uin: bot.self().obj.id,
        to_name: room.obj.topic,
        to_uin: room.obj.id,
        type: 'text',
        content: message
      })
    }
  }

  res.json({
    message: '发送成功'
  })
})

// say
router.post('/sendMedia', async (req, res, next) => {
  console.log(req.files[0]); // 上传的文件信息
  const rooms = req.body.roomList;
  const imgUrl = req.body.imageUrl;
  // let rooms = []
  let response
  var des_file = dir + "/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, async function (err) {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < rooms.length; i++) {
          let room = await Room.find({
            topic: rooms[i]
          })
          await room.say(new MediaMessage(des_file))
          console.log('room:', room)
          record.create({
            from_name: bot.self().obj.name,
            from_uin: bot.self().obj.id,
            to_name: room.obj.topic,
            to_uin: room.obj.id,
            type: 'media',
            content: imgUrl
          })
        }
        // bot.say(new MediaMessage(des_file))
        res.json({
          message: '发送成功',
          filename: req.files[0].originalname
        })
      }
    });
  });
})

// logout
router.get('/getRecords', async (req, res, next) => {
  record.findAll().then((list) => {
    res.json({
      data: list,
      message: '发送成功',
      filename: req.files[0].originalname
    })
  })
})

// logout
router.get('/logout', async (req, res, next) => {
  bot.logout()
  res.json("success")
})


export default router
