import axios from 'axios'
import request from 'superagent'
import qs from 'query-string'
import {
  API_ROOT
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

export function init(params) {
  return post(`${API_ROOT}/init`, params)
}
