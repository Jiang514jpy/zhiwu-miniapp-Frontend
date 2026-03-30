const auth = require('../utils/auth.js')

class AIApi {
  constructor() {
    this.socket = null
    this.messageQueue = []
  }

  // WebSocket 流式对话
  streamChat(message, onMessage, onComplete, onError) {
    const token = auth.getToken()
    const socketUrl = `wss://your-api-domain.com/api/ai/chat?token=${token}`
    
    this.socket = wx.connectSocket({
      url: socketUrl,
      success: () => {
        console.log('WebSocket 连接成功')
      }
    })

    this.socket.onOpen(() => {
      // 发送消息
      this.socket.send({
        data: JSON.stringify({ message, stream: true })
      })
    })

    // 接收流式消息
    this.socket.onMessage((res) => {
      try {
        const data = JSON.parse(res.data)
        if (data.type === 'chunk') {
          // 流式片段
          onMessage && onMessage(data.content)
        } else if (data.type === 'end') {
          // 对话结束
          onComplete && onComplete()
          this.close()
        } else if (data.type === 'error') {
          onError && onError(data.message)
          this.close()
        }
      } catch (e) {
        console.error('解析消息失败', e)
      }
    })

    this.socket.onError((err) => {
      onError && onError(err)
      this.close()
    })

    this.socket.onClose(() => {
      console.log('WebSocket 关闭')
    })
  }

  // 普通请求（非流式）
  async chat(message) {
    const { post } = require('../utils/request.js')
    return post('/api/ai/chat', { message })
  }

  // 关闭连接
  close() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }
}

module.exports = new AIApi()