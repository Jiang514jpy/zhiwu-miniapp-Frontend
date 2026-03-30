// pages/ai/ai.js
Page({
  data: {
    messages: [],
    inputValue: '',
    isLoading: false,
    scrollToView: '',
    messageId: 0,
    showUploadPanel: false
  },

  onLoad() {
    // 页面加载时发送AI欢迎消息
    this.addAIMessage('您好~我是您的植物智能养护助手小植，您在养护植物的过程中遇到了什么问题呢？')
  },

  // 输入框内容变化
  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 发送消息
  sendMessage() {
    const { inputValue } = this.data
    if (!inputValue.trim()) {
      return
    }

    // 添加用户消息
    this.addUserMessage(inputValue)
    
    // 清空输入框
    this.setData({
      inputValue: ''
    })

    // 调用AI接口获取回复
    this.callAIApi(inputValue)
  },

  // 切换上传面板显示
  toggleUploadPanel() {
    this.setData({
      showUploadPanel: !this.data.showUploadPanel
    })
  },

  // 隐藏上传面板
  hideUploadPanel() {
    this.setData({
      showUploadPanel: false
    })
  },

  // 拍照
  takePhoto() {
    this.hideUploadPanel()
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.handleImageUpload(tempFilePath)
      },
      fail: (err) => {
        console.error('拍照失败:', err)
      }
    })
  },

  // 从相册选择图片
  chooseImage() {
    this.hideUploadPanel()
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.handleImageUpload(tempFilePath)
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
      }
    })
  },

  // 处理图片上传
  handleImageUpload(tempFilePath) {
    // 添加用户图片消息
    this.addUserImageMessage(tempFilePath)
    
    // 调用AI接口分析图片
    this.callAIApiWithImage(tempFilePath)
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },

  // 添加用户消息
  addUserMessage(content) {
    const { messages, messageId } = this.data
    const newMessage = {
      id: messageId + 1,
      type: 'user',
      content: content
    }
    
    this.setData({
      messages: [...messages, newMessage],
      messageId: messageId + 1,
      scrollToView: `msg-${messageId + 1}`
    })
  },

  // 添加用户图片消息
  addUserImageMessage(imagePath) {
    const { messages, messageId } = this.data
    const newMessage = {
      id: messageId + 1,
      type: 'user-image',
      imagePath: imagePath
    }
    
    this.setData({
      messages: [...messages, newMessage],
      messageId: messageId + 1,
      scrollToView: `msg-${messageId + 1}`
    })
  },

  // 添加AI普通消息
  addAIMessage(content) {
    const { messages, messageId } = this.data
    const newMessage = {
      id: messageId + 1,
      type: 'ai',
      content: content
    }
    
    this.setData({
      messages: [...messages, newMessage],
      messageId: messageId + 1,
      scrollToView: `msg-${messageId + 1}`
    })
  },

  // 添加AI详细回复消息
  addAIDetailMessage(intro, points, tip) {
    const { messages, messageId } = this.data
    const newMessage = {
      id: messageId + 1,
      type: 'ai-detail',
      intro: intro,
      points: points,
      tip: tip
    }
    
    this.setData({
      messages: [...messages, newMessage],
      messageId: messageId + 1,
      scrollToView: `msg-${messageId + 1}`
    })
  },

  // 调用AI接口 - 文字消息
  callAIApi(userInput) {
    const app = getApp()
    
    this.setData({ isLoading: true })

    // 实际项目中替换为真实API地址
    wx.request({
      url: app.globalData.aiApiUrl || 'https://your-api-url.com/chat',
      method: 'POST',
      data: {
        message: userInput,
        context: 'plant_care'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        this.setData({ isLoading: false })
        
        if (res.statusCode === 200 && res.data) {
          // 根据API返回格式处理回复
          if (res.data.type === 'detail') {
            this.addAIDetailMessage(
              res.data.intro,
              res.data.points,
              res.data.tip
            )
          } else {
            this.addAIMessage(res.data.content || res.data.message)
          }
        } else {
          this.addAIMessage('抱歉，我暂时无法回答这个问题，请稍后再试。')
        }
      },
      fail: (err) => {
        console.error('AI API调用失败:', err)
        this.setData({ isLoading: false })
        this.addAIMessage('网络连接出现问题，请检查网络后重试。')
      }
    })
  },

  // 调用AI接口 - 图片识别
  callAIApiWithImage(tempFilePath) {
    const app = getApp()
    
    this.setData({ isLoading: true })

    // 上传图片到服务器进行AI分析
    wx.uploadFile({
      url: app.globalData.aiApiUrl || 'https://your-api-url.com/analyze-image',
      filePath: tempFilePath,
      name: 'image',
      formData: {
        context: 'plant_care'
      },
      success: (res) => {
        this.setData({ isLoading: false })
        
        try {
          const data = JSON.parse(res.data)
          if (data.type === 'detail') {
            this.addAIDetailMessage(
              data.intro,
              data.points,
              data.tip
            )
          } else {
            this.addAIMessage(data.content || data.message)
          }
        } catch (e) {
          this.addAIMessage('图片分析完成，但解析结果时出现问题。')
        }
      },
      fail: (err) => {
        console.error('图片上传失败:', err)
        this.setData({ isLoading: false })
        this.addAIMessage('图片上传失败，请检查网络后重试。')
      }
    })
  }
})