const { post } = require('../utils/request.js')

// 图片识别植物
const recognizePlant = (imagePath) => {
  return new Promise((resolve, reject) => {
    const token = auth.getToken()
    wx.uploadFile({
      url: BASE_URL + '/api/ai/recognize',
      filePath: imagePath,
      name: 'image',
      header: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success(res) {
        const data = JSON.parse(res.data)
        if (data.code === 0) {
          resolve(data.data)
        } else {
          reject(data)
        }
      },
      fail: reject
    })
  })
}

// 获取识别历史
const getRecognitionHistory = (page = 1, size = 20) => {
  return post('/api/reminder/history', { page, size })
}

module.exports = {
  recognizePlant,
  getRecognitionHistory
}