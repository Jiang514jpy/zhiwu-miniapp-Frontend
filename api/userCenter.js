const { get, post, put } = require('../utils/request.js')

// 获取用户资料
const getUserProfile = () => {
  return get('/api/user/profile')
}

// 更新用户资料
const updateUserProfile = (data) => {
  return put('/api/user/profile', data)
}

// 修改密码
const changePassword = (oldPassword, newPassword) => {
  return post('/api/user/change-password', { oldPassword, newPassword })
}

// 上传头像
const uploadAvatar = (filePath) => {
  return new Promise((resolve, reject) => {
    const token = auth.getToken()
    wx.uploadFile({
      url: BASE_URL + '/api/user/avatar',
      filePath: filePath,
      name: 'avatar',
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

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadAvatar
}