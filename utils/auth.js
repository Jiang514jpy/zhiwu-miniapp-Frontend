const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  TOKEN_EXPIRE: 'tokenExpire'
}

class AuthManager {
  constructor() {
    this.token = null
    this.userInfo = null
  }

  // 存储 token
  setToken(token, expireTime = 7 * 24 * 3600 * 1000) { // 默认7天
    this.token = token
    wx.setStorageSync(STORAGE_KEYS.TOKEN, token)
    const expireDate = Date.now() + expireTime
    wx.setStorageSync(STORAGE_KEYS.TOKEN_EXPIRE, expireDate)
  }

  // 获取 token
  getToken() {
    if (!this.token) {
      this.token = wx.getStorageSync(STORAGE_KEYS.TOKEN)
    }
    // 检查是否过期
    const expire = wx.getStorageSync(STORAGE_KEYS.TOKEN_EXPIRE)
    if (expire && Date.now() > expire) {
      this.clearToken()
      return null
    }
    return this.token
  }

  // 清除 token
  clearToken() {
    this.token = null
    this.userInfo = null
    wx.removeStorageSync(STORAGE_KEYS.TOKEN)
    wx.removeStorageSync(STORAGE_KEYS.TOKEN_EXPIRE)
    wx.removeStorageSync(STORAGE_KEYS.USER_INFO)
  }

  // 存储用户信息
  setUserInfo(userInfo) {
    this.userInfo = userInfo
    wx.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo)
  }

  // 获取用户信息
  getUserInfo() {
    if (!this.userInfo) {
      this.userInfo = wx.getStorageSync(STORAGE_KEYS.USER_INFO)
    }
    return this.userInfo
  }

  // 检查登录状态
  isLoggedIn() {
    const token = this.getToken()
    return !!token
  }

  // 跳转登录（带返回路径）
  redirectToLogin() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const redirectUrl = `/${currentPage.route}`
    
    wx.navigateTo({
      url: `/pages/login/login?redirect=${encodeURIComponent(redirectUrl)}`
    })
  }

  // 登录拦截器（在需要登录的页面 onLoad 中调用）
  checkAuth() {
    if (!this.isLoggedIn()) {
      this.redirectToLogin()
      return false
    }
    return true
  }
}

module.exports = new AuthManager()