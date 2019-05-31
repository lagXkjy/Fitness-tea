const $common = require('../../../common/common.js');
Page({
  data: {
    teaSrc: $common.config.teaSrc,
    table: ['未完成', '已完成'],
    tableIndex: 0,
    pageIndex: 1,
    pageSize: 5,
    orderInfo: [],
    flag: true,
  },
  tableChange(e) {
    this.setData({
      tableIndex: parseInt(e.currentTarget.dataset.index),
      orderInfo: []
    });
    this.data.pageIndex = 1;
    this.init();
  },
  skipMyCourseDetail(e) {
    let index = e.currentTarget.dataset.index,
      orderInfo = this.data.orderInfo;
    wx.navigateTo({
      url: `/pages/my/myCourseDetail/myCourseDetail?isGroup=0&title=我的预约&codId=${orderInfo[index].CodId}`,
    })
  },
  setTime(e) {
    let index = e.currentTarget.dataset.index;
    let orderInfo = this.data.orderInfo;
    wx.navigateTo({
      url: `/pages/my/setTime/setTime?codId=${orderInfo[index].CodId}&corId=${orderInfo[index].CorId}`,
    })
  },
  init(isReach) {
    let pageSize = this.data.pageSize,
      pageIndex = 1;
    isReach && (pageIndex = this.data.pageIndex);
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.GetCoaPrivateOdrInfos,
      {
        openId: wx.getStorageSync('openId'),
        type: this.data.tableIndex + 1, //1 未完成 2 已完成
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          let orderInfo = [];
          isReach && (orderInfo = this.data.orderInfo);
          let arr = res.data.OdrInfo;
          for (let i = 0, len = arr.length; i < len; i++) {
            arr[i].image = arr[i].CoaHeadPic;
            arr[i].name = arr[i].CorName;
            arr[i].info = arr[i].CorAbstract;
            arr[i].price = arr[i].CorRePrice;
            arr[i].oldPrice = arr[i].CorPrice;
            orderInfo.push(arr[i]);
          }
          arr.length >= pageSize && (this.data.pageIndex++);
          orderInfo = $common.api.unique(orderInfo, 'CodId'); //去重
          this.setData({
            orderInfo: orderInfo
          })
        } else {
          res.data.errType != 6 && ($common.err1());
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
    this.init();
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
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.flag) return;
    this.data.flag = false;
    this.init(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return $common.api.share();
  }
})