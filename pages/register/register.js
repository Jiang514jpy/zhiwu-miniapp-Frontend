// pages/register/register.js
Page({
  data: {
    phone: '',
    password: '',
    confirmPassword: ''
  },

  // 输入手机号
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 输入新密码
  onPwdInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 输入确认密码
  onConfirmPwdInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  // 注册按钮点击
  handleRegister() {
    const { phone, password, confirmPassword } = this.data;

    // 基础校验
    if (!phone || !password || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      });
      return;
    }
    if (password.length < 6) {
      wx.showToast({
        title: '密码长度至少6位',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '注册中...' });
    // 模拟注册接口请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      });
      // 注册成功后跳转到登录页
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }, 1500);
  },

  // 跳转到登录页
  goToLogin() {
    wx.navigateBack({
      delta: 1
    });
    // 或者如果是从其他页面进入，也可以用 wx.redirectTo({ url: '/pages/login/login' })
  },

  // 跳转到验证码注册页
  goToSmsRegister() {
    wx.navigateTo({
      url: '/pages/sms-register/sms-register' // 后续可创建该页面
    });
  }
});