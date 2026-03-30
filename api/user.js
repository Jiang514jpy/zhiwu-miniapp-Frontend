const { post } = require('../utils/request.js')
const auth = require('../utils/auth.js')

// 微信登录
const wxLogin = (code) => {
  return post('/api/user/wx-login', { code })
}

// 手机号登录
const phoneLogin = (phone, code) => {
  return post('/api/user/phone-login', { phone, code })
}

// 发送验证码
const sendSmsCode = (phone) => {
  return post('/api/user/send-sms', { phone })
}

// 登出
const logout = () => {
  auth.clearToken()
  wx.reLaunch({ url: '/pages/login/login' })
}

module.exports = {
  wxLogin,
  phoneLogin,
  sendSmsCode,
  logout
}