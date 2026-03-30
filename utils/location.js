class LocationUtil {
  // 检查定位权限
  async checkLocationPermission() {
    return new Promise((resolve) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            resolve(true)
          } else {
            wx.authorize({
              scope: 'scope.userLocation',
              success: () => resolve(true),
              fail: () => {
                wx.showModal({
                  title: '提示',
                  content: '需要位置权限，请在设置中开启',
                  confirmText: '去设置',
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      wx.openSetting()
                    }
                  }
                })
                resolve(false)
              }
            })
          }
        }
      })
    })
  }

  // 获取当前位置
  async getCurrentLocation() {
    const hasPermission = await this.checkLocationPermission()
    if (!hasPermission) return null

    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02', // 国测局坐标
        success: (res) => {
          resolve({
            latitude: res.latitude,
            longitude: res.longitude,
            address: res.address
          })
        },
        fail: reject
      })
    })
  }

  // 选择位置
  chooseLocation() {
    return new Promise((resolve, reject) => {
      wx.chooseLocation({
        success: resolve,
        fail: reject
      })
    })
  }

  // 打开地图查看位置
  openLocation(latitude, longitude, name, address) {
    wx.openLocation({
      latitude,
      longitude,
      name,
      address
    })
  }
}

module.exports = new LocationUtil()