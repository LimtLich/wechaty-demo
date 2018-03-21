import axios from 'axios'
import request from 'superagent'
import qs from 'query-string'
import {
  API_ROOT,
  FILE_ROOT
} from './config.js'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//拦截器
axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)
  return config
}, error => {
  return Promise.reject(error)
})

function fetch(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        resolve(response.data)
      }, reject)
  })
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response) => {
        resolve(response.data)
      }, reject)
  })
}

export function init() {
  return fetch(`${API_ROOT}/init`)
}

export function getUserInfo(params) {
  return fetch(`${API_ROOT}/getUserInfo`)
}

export function logout(params) {
  return fetch(`${API_ROOT}/logout`)
}

export function sendText(params) {
  return post(`${API_ROOT}/sendText`,params)
}

export function sendMedia(params) {
  return post(`${API_ROOT}/sendMedia`,params)
}

export function uploadFiles(file) {
  return request.post(`${FILE_ROOT}/ipr/fastdfs/upload`).attach('file', file).then(res => res.body)
}