import {
  Router
} from 'express'
import request from 'superagent'
import {
  HOST_ROOT
} from '../../api/config'

const router = Router()

// login
router.post('/login', async (req, res, next) => {
  let userRes = await request.post(`${HOST_ROOT}/bidCompanyInfo/login;jsessionid=${req.body.JSESSIONID}`)
    .type('form')
    .set('Accept', 'application/json')
    .send(req.body)
  if (userRes) {
    let data = JSON.parse(userRes.text)
    // console.log(data)
    req.session.authUser = data.data
    return res.json(data)
  }
  res.status(401).json({
    message: 'Bad credentials'
  })
})

//注册
router.post('/register', async (req, res, next) => {
  let userRes = await request.post(`${HOST_ROOT}/bidCompanyInfo/register;jsessionid=${req.body.JSESSIONID}`)
    .type('form')
    .set('Accept', 'application/json')
    .send(req.body)
  if (userRes) {
    let data = JSON.parse(userRes.text)
    // console.log(data)
    req.session.authUser = data.data
    return res.json(data)
  }
  res.status(401).json({
    message: 'Bad credentials'
  })
})

// logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({
    ok: true
  })
})

//geetest
router.get('/geetest', async (req, res, next) => {
  let geetest = await request.get(`${HOST_ROOT}/bidCompanyInfo/getGt3`)
  // let geetest = await request.get(`${HOST_ROOT}/bidCompanyInfo/getGt3`)
  if (geetest) {
    let data = JSON.parse(geetest.text)
    return res.json(data)
  }
  res.status(401).json({
    message: 'Bad credentials'
  })
})

export default router
