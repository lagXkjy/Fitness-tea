const $common = require('../../../common/common.js');
Page({
  data: {
    teaSrc: $common.config.teaSrc,
    corInfo: {}, //课程信息
    orderInfo: {}, //订单信息
    isOrderBtn: true, //删除订单按钮显隐
  },

  skipCheckCourseTime() {
    let isGroup = this.data.isGroup;
    if (isGroup !== 0) return;
    let corInfo = this.data.corInfo;
    let orderInfo = this.data.orderInfo;
    wx.navigateTo({
      url: `/pages/my/setTime/setTime?codId=${orderInfo.CodId}&corId=${corInfo.CorId}`,
    })
  },
  getCourseInfo() { //获取团课课程信息
    $common.api.request(
      'POST',
      $common.config.GetCorInfo,
      {
        codId: this.data.codId
      },
      (res) => {
        if (res.data.res) {
          let corInfo = res.data.corInfo;
          corInfo.image = corInfo.CoaHeadPic;
          corInfo.name = corInfo.CorName;
          corInfo.info = corInfo.CorAbstract;
          corInfo.price = corInfo.CorRePrice;
          corInfo.oldPrice = corInfo.CorPrice;
          let start = $common.api.timeStamp(corInfo.CctStaTime);
          let end = $common.api.timeStamp(corInfo.CctEndTime);
          corInfo.showTime = `${start.y}-${start.m}-${start.d} ${start.h}:${start.mi}-${end.h}:${end.mi}`;
          this.setData({
            corInfo: corInfo
          })
        } else {
          $common.err1();
        }
      },
      (res) => {
        $common.err2()
      },
      (res) => {

      },
      wx.getStorageSync('Ticket')
    )
  },
  getOrderInfo() { //获取订单信息
    $common.api.request(
      'POST',
      $common.config.GetOrderInfo,
      {
        codId: this.data.codId
      },
      (res) => {
        if (res.data.res) {
          let orderInfo = res.data.OdrInfo;
          let pay = $common.api.timeStamp(orderInfo.CodPayTime);
          orderInfo.payTime = `${pay.y}-${pay.m}-${pay.d} ${pay.h}:${pay.mi}:${pay.s}`;
          let create = $common.api.timeStamp(orderInfo.CodCreateOn);
          orderInfo.createTime = `${create.y}-${create.m}-${create.d} ${create.h}:${create.mi}:${create.s}`;
          orderInfo.CodPrice = parseFloat(orderInfo.CodPrice).toFixed(2);
          if (this.data.isGroup === 0) { //私课
            let start = $common.api.timeStamp(orderInfo.CodStartTime);
            let end = $common.api.timeStamp(orderInfo.CodEndTime);
            orderInfo.courseTime = `${start.y}-${start.m}-${start.d} ${start.h}:${start.mi}-${end.h}:${end.mi}`;
          }
          this.setData({
            orderInfo: orderInfo
          })
        } else {
          $common.err1();
        }
      },
      (res) => {
        $common.err2();
      },
      (res) => {

      },
      wx.getStorageSync('Ticket')
    )
  },
  getPrivateInfo() { //获取私课课程信息
    $common.api.request(
      'POST',
      $common.config.GetPriCorInfo,
      {
        codId: this.data.codId
      },
      (res) => {
        if (res.data.res) {
          let corInfo = res.data.CorInfo;
          corInfo.image = corInfo.CoaHeadPic;
          corInfo.name = corInfo.CorName;
          corInfo.info = corInfo.CorAbstract;
          corInfo.price = corInfo.CorRePrice;
          corInfo.oldPrice = corInfo.CorPrice;
          if (corInfo.CctStaTime) {
            let start = $common.api.timeStamp(corInfo.CctStaTime);
            let end = $common.api.timeStamp(corInfo.CctEndTime);
            corInfo.showTime = `${start.y}-${start.m}-${start.d} ${start.h}:${start.mi}-${end.h}:${end.mi}`;
          } 
          this.setData({
            corInfo: corInfo
          })
        } else {
          $common.err1();
        }
      },
      (res) => {
        $common.err2()
      },
      (res) => {

      },
      wx.getStorageSync('Ticket')
    )
  },
  init() {
    let isGroup = this.data.isGroup;
    if (isGroup === 1) { //团课
      this.getCourseInfo();
    } else { //私课
      this.getPrivateInfo();
    }
    this.getOrderInfo();
  },
  onLoad: function (options) {
    let title = options.title && options.title;
    wx.setNavigationBarTitle({
      title: title
    })
    let codId = options.codId && options.codId;
    this.data.codId = codId;
    let isGroup = options.isGroup && +options.isGroup;
    this.setData({
      isGroup: isGroup
    })
    $common.getOpenId(this.init.bind(this)); //入口页面，获取openid

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
    this.setData({
      userType: wx.getStorageSync('userType')
    })
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
  onShareAppMessage: function () {
    return $common.api.share();
  }
})