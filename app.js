// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code)
      }
    })
  },

  globalData: {
    userInfo: null,
    // API 基础路径，后期接入后端时修改
    baseUrl: 'https://your-api-domain.com/api',
    // 植物数据缓存
    plants: [],
    // 天气数据缓存
    weather: null
  },

  // 全局方法：发起 API 请求
  request(options) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.baseUrl + options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
          'Content-Type': 'application/json',
          ...options.header
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  },

  // 全局方法：上传文件
  uploadFile(filePath, url) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: this.globalData.baseUrl + url,
        filePath: filePath,
        name: 'file',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.data))
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  }
})