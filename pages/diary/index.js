// pages/diary/index.js

/**
 * API 接口预留 - 后期接入数据库时替换这些方法
 */
const PlantAPI = {
  /**
   * 获取植物列表
   * @returns {Promise<Array>} 植物数据数组
   */
  async getPlants() {
    // TODO: 替换为真实 API 调用
    // return await wx.request({ url: 'YOUR_API/plants', method: 'GET' })
    return Promise.resolve([
      {
        id: '1',
        name: '龟背竹',
        avatar: '/images/plant-placeholder.svg',
        addedDate: '2025年11月1日',
        daysUntilWater: 2,
        diaryEntries: [
          {
            id: 'e1',
            date: '2025年11月8日',
            actions: ['water', 'fertilize'],
            note: '今天叶子变黄了一点。',
            images: ['/images/plant-placeholder.svg', '/images/plant-placeholder.svg'],
            swipeX: 0
          },
          {
            id: 'e2',
            date: '2025年11月15日',
            actions: ['water', 'prune'],
            note: '叶子变大了。',
            images: ['/images/plant-placeholder.svg', '/images/plant-placeholder.svg'],
            swipeX: 0
          },
          {
            id: 'e3',
            date: '2025年11月16日',
            actions: ['water'],
            note: '今天没什么变化。',
            images: [],
            swipeX: 0
          }
        ]
      },
      {
        id: '2',
        name: '绿萝',
        avatar: '/images/plant-placeholder.svg',
        addedDate: '2025年10月15日',
        daysUntilWater: 1,
        diaryEntries: [
          {
            id: 'e4',
            date: '2025年11月10日',
            actions: ['water'],
            note: '长出新叶子了！',
            images: [],
            swipeX: 0
          }
        ]
      }
    ])
  },

  /**
   * 获取天气信息
   * @returns {Promise<Object>} 天气数据
   */
  async getWeather() {
    // TODO: 替换为真实天气 API 调用
    // return await wx.request({ url: 'YOUR_API/weather', method: 'GET' })
    return Promise.resolve({
      condition: '晴',
      tempLow: 6,
      tempHigh: 15,
      icon: 'sunny'
    })
  },

  /**
   * 添加日记条目
   * @param {string} plantId 植物 ID
   * @param {Object} entry 日记条目数据
   * @returns {Promise<Object>} 新建的日记条目
   */
  async addDiaryEntry(plantId, entry) {
    // TODO: 替换为真实 API 调用
    // return await wx.request({
    //   url: `YOUR_API/plants/${plantId}/entries`,
    //   method: 'POST',
    //   data: entry
    // })
    return Promise.resolve({
      id: 'e' + Date.now(),
      ...entry,
      swipeX: 0
    })
  },

  /**
   * 删除日记条目
   * @param {string} plantId 植物 ID
   * @param {string} entryId 日记条目 ID
   * @returns {Promise<boolean>} 删除结果
   */
  async deleteDiaryEntry(plantId, entryId) {
    // TODO: 替换为真实 API 调用
    // return await wx.request({
    //   url: `YOUR_API/plants/${plantId}/entries/${entryId}`,
    //   method: 'DELETE'
    // })
    return Promise.resolve(true)
  },

  /**
   * 上传图片
   * @param {string} filePath 本地文件路径
   * @returns {Promise<string>} 上传后的图片 URL
   */
  async uploadImage(filePath) {
    // TODO: 替换为真实上传 API
    // return await wx.uploadFile({
    //   url: 'YOUR_API/upload',
    //   filePath: filePath,
    //   name: 'file'
    // })
    return Promise.resolve(filePath)
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 天气数据
    weather: {
      condition: '晴',
      tempLow: 6,
      tempHigh: 15
    },
    
    // 植物列表
    plants: [],
    
    // 当前选中的植物索引
    currentPlantIndex: 0,
    
    // 当前植物 (计算属性模拟)
    currentPlant: null,
    
    // 底部导航当前选中
    activeTab: 'plant',
    
    // 添加日记弹窗显示状态
    showAddModal: false,
    
    // 新日记条目数据
    newEntry: {
      note: '',
      actions: [],
      images: []
    },
    
    // 滑动删除相关
    touchStartX: 0,
    touchStartY: 0,
    currentSwipeId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },

  /**
   * 加载数据
   */
  async loadData() {
    try {
      wx.showLoading({ title: '加载中...' })
      
      const [plants, weather] = await Promise.all([
        PlantAPI.getPlants(),
        PlantAPI.getWeather()
      ])
      
      this.setData({
        plants: plants,
        weather: weather,
        currentPlant: plants[0] || null
      })
      
      wx.hideLoading()
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      console.error('加载数据失败:', error)
    }
  },

  /**
   * 页面下拉刷新
   */
  onPullDownRefresh: function () {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 植物轮播切换
   */
  onPlantSwiperChange: function (e) {
    const index = e.detail.current
    this.setData({
      currentPlantIndex: index,
      currentPlant: this.data.plants[index]
    })
  },

  /**
   * 切换底部导航
   */
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    
    // TODO: 根据需要跳转到对应页面
    // wx.switchTab({ url: `/pages/${tab}/index` })
  },

  /**
   * 打开添加日记弹窗
   */
  openAddModal: function () {
    this.setData({
      showAddModal: true,
      newEntry: {
        note: '',
        actions: [],
        images: []
      }
    })
  },

  /**
   * 关闭添加日记弹窗
   */
  closeAddModal: function () {
    this.setData({ showAddModal: false })
  },

  /**
   * 输入日记内容
   */
  onNoteInput: function (e) {
    this.setData({
      'newEntry.note': e.detail.value
    })
  },

  /**
   * 切换养护操作
   */
  toggleAction: function (e) {
    const action = e.currentTarget.dataset.action
    const actions = [...this.data.newEntry.actions]
    const index = actions.indexOf(action)
    
    if (index > -1) {
      actions.splice(index, 1)
    } else {
      actions.push(action)
    }
    
    this.setData({
      'newEntry.actions': actions
    })
  },

  /**
   * 选择图片
   */
  chooseImage: function () {
    const that = this
    const remainCount = 9 - this.data.newEntry.images.length
    
    wx.chooseMedia({
      count: remainCount,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        wx.showLoading({ title: '上传中...' })
        
        try {
          const uploadPromises = res.tempFiles.map(file => 
            PlantAPI.uploadImage(file.tempFilePath)
          )
          const uploadedUrls = await Promise.all(uploadPromises)
          
          that.setData({
            'newEntry.images': [...that.data.newEntry.images, ...uploadedUrls]
          })
          
          wx.hideLoading()
        } catch (error) {
          wx.hideLoading()
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 移除已选图片
   */
  removeImage: function (e) {
    const index = e.currentTarget.dataset.index
    const images = [...this.data.newEntry.images]
    images.splice(index, 1)
    
    this.setData({
      'newEntry.images': images
    })
  },

  /**
   * 提交日记
   */
  submitEntry: async function () {
    const { newEntry, currentPlant, currentPlantIndex, plants } = this.data
    
    // 验证
    if (!newEntry.note.trim() && newEntry.actions.length === 0 && newEntry.images.length === 0) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    
    wx.showLoading({ title: '保存中...' })
    
    try {
      // 格式化日期
      const now = new Date()
      const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
      
      const entryData = {
        date: dateStr,
        actions: newEntry.actions,
        note: newEntry.note || '无备注',
        images: newEntry.images
      }
      
      // 调用 API 添加日记
      const newEntryResult = await PlantAPI.addDiaryEntry(currentPlant.id, entryData)
      
      // 更新本地数据
      const updatedPlants = [...plants]
      updatedPlants[currentPlantIndex].diaryEntries.unshift(newEntryResult)
      
      this.setData({
        plants: updatedPlants,
        currentPlant: updatedPlants[currentPlantIndex],
        showAddModal: false
      })
      
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '添加失败',
        icon: 'none'
      })
      console.error('添加日记失败:', error)
    }
  },

  /**
   * 触摸开始 - 滑动删除
   */
  onTouchStart: function (e) {
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY,
      currentSwipeId: e.currentTarget.dataset.id
    })
  },

  /**
   * 触摸移动 - 滑动删除
   */
  onTouchMove: function (e) {
    const { touchStartX, touchStartY, currentSwipeId, currentPlant } = this.data
    const touchMoveX = e.touches[0].clientX
    const touchMoveY = e.touches[0].clientY
    
    // 判断是否为横向滑动
    const deltaX = touchMoveX - touchStartX
    const deltaY = touchMoveY - touchStartY
    
    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return // 纵向滑动，不处理
    }
    
    // 找到当前滑动的条目并更新其位置
    const entries = currentPlant.diaryEntries.map(entry => {
      if (entry.id === currentSwipeId) {
        let swipeX = deltaX
        // 限制滑动范围
        swipeX = Math.max(-80, Math.min(0, swipeX))
        return { ...entry, swipeX }
      }
      return { ...entry, swipeX: 0 }
    })
    
    this.setData({
      'currentPlant.diaryEntries': entries
    })
  },

  /**
   * 触摸结束 - 滑动删除
   */
  onTouchEnd: function (e) {
    const { currentPlant } = this.data
    
    const entries = currentPlant.diaryEntries.map(entry => {
      // 如果滑动超过阈值，保持展开状态
      if (entry.swipeX < -40) {
        return { ...entry, swipeX: -80 }
      }
      return { ...entry, swipeX: 0 }
    })
    
    this.setData({
      'currentPlant.diaryEntries': entries
    })
  },

  /**
   * 删除日记条目
   */
  deleteEntry: async function (e) {
    const entryId = e.currentTarget.dataset.id
    const { currentPlant, currentPlantIndex, plants } = this.data
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条日记吗？',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' })
          
          try {
            await PlantAPI.deleteDiaryEntry(currentPlant.id, entryId)
            
            // 更新本地数据
            const updatedPlants = [...plants]
            updatedPlants[currentPlantIndex].diaryEntries = 
              updatedPlants[currentPlantIndex].diaryEntries.filter(e => e.id !== entryId)
            
            this.setData({
              plants: updatedPlants,
              currentPlant: updatedPlants[currentPlantIndex]
            })
            
            wx.hideLoading()
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
          } catch (error) {
            wx.hideLoading()
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  /**
   * 预览图片
   */
  previewImage: function (e) {
    const current = e.currentTarget.dataset.src
    const urls = e.currentTarget.dataset.urls
    
    wx.previewImage({
      current: current,
      urls: urls
    })
  }
})
