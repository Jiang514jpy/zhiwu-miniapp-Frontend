// pages/user/user.js
Page({
  data: {
    userInfo: {
      nickname: '用户名',
      id: '12345'
    },
    stats: {
      plantCount: 4,
      careRecords: 3,
      careDays: 17
    },
    careRecords: []
  },

  onLoad() {
    this.loadUserInfo()
    this.loadStats()
    this.loadCareRecords()
  },

  onShow() {
    this.loadUserInfo()
    this.loadStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const app = getApp()
    if (!app.globalData.apiUrl) return
    
    wx.request({
      url: app.globalData.apiUrl + '/user/info',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.setData({
            userInfo: {
              nickname: res.data.nickname || '用户名',
              id: res.data.id || '12345'
            }
          })
        }
      }
    })
  },

  // 加载统计数据
  loadStats() {
    const app = getApp()
    if (!app.globalData.apiUrl) return
    
    wx.request({
      url: app.globalData.apiUrl + '/user/stats',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.setData({
            stats: {
              plantCount: res.data.plantCount || 0,
              careRecords: res.data.careRecords || 0,
              careDays: res.data.careDays || 0
            }
          })
        }
      }
    })
  },

  // 加载养护记录
  loadCareRecords() {
    const app = getApp()
    if (!app.globalData.apiUrl) return
    
    wx.request({
      url: app.globalData.apiUrl + '/user/care-records',
      method: 'GET',
      data: { limit: 5 },
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data && res.data.list) {
          this.setData({
            careRecords: res.data.list
          })
        }
      }
    })
  },

  // 跳转到我的植物
  goToMyPlants() {
    wx.navigateTo({ url: '/pages/my-plants/my-plants' })
  },

  // 跳转到养护记录
  goToCareRecords() {
    wx.navigateTo({ url: '/pages/care-records/care-records' })
  },

  // 跳转到养护详情
  goToCareDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/care-detail/care-detail?id=' + id })
  },

  // 跳转到个人资料
  goToProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' })
  },

  // 跳转到更改密码
  goToChangePassword() {
    wx.navigateTo({ url: '/pages/change-password/change-password' })
  },

  // 删除账号
  deleteAccount() {
    wx.showModal({
      title: '警告',
      content: '删除账号后所有数据将无法恢复，确定删除吗？',
      confirmText: '确定删除',
      confirmColor: '#c9735a',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.confirmDeleteAccount()
        }
      }
    })
  },

  // 确认删除账号
  confirmDeleteAccount() {
    const app = getApp()
    wx.showLoading({ title: '处理中...' })
    
    wx.request({
      url: app.globalData.apiUrl + '/user/delete',
      method: 'DELETE',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode === 200) {
          wx.clearStorageSync()
          wx.showToast({
            title: '账号已删除',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/login/login' })
          }, 1500)
        } else {
          wx.showToast({ title: '删除失败', icon: 'none' })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '网络错误', icon: 'none' })
      }
    })
  },

  // 切换TabBar
  switchTab(e) {
    const path = e.currentTarget.dataset.path
    wx.switchTab({
      url: path,
      fail: () => {
        wx.navigateTo({ url: path })
      }
    })
  }
})