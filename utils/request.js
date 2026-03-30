const auth = require('./auth.js')

const BASE_URL = 'https://your-api-domain.com' // 替换为实际地址

const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = auth.getToken()
    
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success(res) {
        if (res.statusCode === 200) {
          if (res.data.code === 0 || res.data.code === 200) {
            resolve(res.data.data || res.data)
          } else if (res.data.code === 401) {
            // token 过期或无效
            auth.clearToken()
            auth.redirectToLogin()
            reject(new Error('登录已过期'))
          } else {
            wx.showToast({
              title: res.data.message || '请求失败',
              icon: 'none'
            })
            reject(res.data)
          }
        } else {
          reject(res)
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

// 封装 GET/POST 方法
const get = (url, data = {}) => request({ url, method: 'GET', data })
const post = (url, data = {}) => request({ url, method: 'POST', data })
const put = (url, data = {}) => request({ url, method: 'PUT', data })
const del = (url, data = {}) => request({ url, method: 'DELETE', data })

module.exports = {
  request,
  get,
  post,
  put,
  delete: del
}