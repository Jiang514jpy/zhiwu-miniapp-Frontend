// pages/login/login.js
Page({
  data: {
    phone: '',
    password: ''
  },

  // 输入账号
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 输入密码
  onPwdInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 登录按钮点击
  handleLogin() {
    const { phone, password } = this.data;
    if (!phone || !password) {
      wx.showToast({
        title: '请输入账号或密码',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({ title: '登录中...' });
    // 替换为真实登录接口
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '登录成功', icon: 'success' });
      wx.switchTab({ url: '/pages/index/index' });
    }, 1500);
  },

  // 注册按钮点击
  handleRegister() {
    wx.navigateTo({ url: '/pages/register/register' });
  },

  // 忘记密码
  handleForgetPwd() {
    wx.navigateTo({ url: '/pages/forget-pwd/forget-pwd' });
  }
});