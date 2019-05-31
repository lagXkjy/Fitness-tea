const $common = require('../../../common/common.js');
Page({
  data: {
    account: '',
    password: '',
    flag: true, //防止连点
  },
  account(e) {
    this.data.account = e.detail.value;
  },
  password(e) {
    this.data.password = e.detail.value;
  },
  getUserInfo(e) { //获取用户信息
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      $common.getUserInfo(userInfo, $common.globalFun.bind($common, this.submit.bind(this)));
    }
  },
  submit() {  //绑定信息
    if (!this.data.flag) return;
    this.data.flag = false;
    let account = this.data.account,
      password = this.data.password;
    if (account.trim().length <= 0) {
      $common.api.showModal('请填写账号');
      this.data.flag = true;
      return;
    }
    if (password.trim().length <= 0) {
      $common.api.showModal('请填写密码');
      this.data.flag = true;
      return;
    }
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.BindCoachInfo,
      {
        openId: wx.getStorageSync('openId'),
        userName: account,
        userPwd: password
      },
      (res) => {
        if (res.data.res) {
          wx.switchTab({
            url: '/pages/tabBar/shop/shop',
          })
        } else {
          switch (parseInt(res.data.errType)) {
            case 5:
              $common.api.showModal('账号或密码错误');
              break;
            case 7:
              $common.api.showModal('该教练已经绑定其他用户，绑定失败');
              break;
            case 8:
              // $common.api.showModal('已经绑定成功，无需重复绑定');
              wx.switchTab({
                url: '/pages/tabBar/shop/shop',
              })
              break;
            case 18:
              $common.api.showModal('该教练信息已被删除，请联系管理员');
              break;
            default:
              $common.err1();
          }
        }
      },
      (res) => {
        $common.err2();
      },
      (res) => {
        this.data.flag = true;
        $common.hide();
      },
      wx.getStorageSync('Ticket')
    )
  },
  onLoad: function (options) {
    $common.Login();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return $common.api.share();
  }
})