class CameraUtil {
  // 检查相机权限
  async checkCameraPermission() {
    return new Promise((resolve) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.camera']) {
            resolve(true)
          } else {
            wx.authorize({
              scope: 'scope.camera',
              success: () => resolve(true),
              fail: () => {
                wx.showModal({
                  title: '提示',
                  content: '需要相机权限，请在设置中开启',
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

  // 拍照
  async takePhoto() {
    const hasPermission = await this.checkCameraPermission()
    if (!hasPermission) return null

    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sourceType: ['camera'],
        sizeType: ['compressed'],
        success: (res) => {
          resolve(res.tempFilePaths[0])
        },
        fail: reject
      })
    })
  }

  // 从相册选择
  async chooseFromAlbum() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sourceType: ['album'],
        sizeType: ['compressed'],
        success: (res) => {
          resolve(res.tempFilePaths[0])
        },
        fail: reject
      })
    })
  }

  // 预览图片
  previewImage(urls, current = 0) {
    wx.previewImage({
      urls: Array.isArray(urls) ? urls : [urls],
      current
    })
  }
}

module.exports = new CameraUtil()