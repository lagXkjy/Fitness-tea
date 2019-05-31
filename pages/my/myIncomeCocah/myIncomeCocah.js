const $common = require('../../../common/common.js');
Page({
  data: {
    listData: [],
    pageIndex: 1,
    pageSize: 15,
    flag: true
  },
  getAllPrice() { //获取总收入
    $common.api.request(
      'POST',
      $common.config.GetCoaAllIncome,
      {
        openId: wx.getStorageSync('openId')
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            Income: parseFloat(res.data.Income).toFixed(2)
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
  getList(isReach) { //获取列表
    let pageSize = this.data.pageSize,
      pageIndex = 1;
    isReach && (pageIndex = this.data.pageIndex);
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.GetCoaIncomes,
      {
        openId: wx.getStorageSync('openId'),
        pageSize: pageSize,
        pageIndex: pageIndex
      },
      (res) => {
        if (res.data.res) {
          let listData = [];
          isReach && (listData = this.data.listData);
          let arr = res.data.dataInfos;
          for (let i = 0, len = arr.length; i < len; i++) {
            let t = $common.api.timeStamp(arr[i].CodPayTime);
            arr[i].showTime = `${t.y}-${t.m}-${t.d}`;
            arr[i].CodCoaPer = parseFloat(arr[i].CodCoaPer).toFixed(2);
            listData.push(arr[i]);
          }
          arr.length >= pageSize && (this.data.pageIndex++);
          listData = $common.api.unique(listData, 'CodId');
          this.setData({
            listData: listData
          })
        } else {
          +res.data.errType !== 6 && ($common.err1());
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
  init() {
    this.getAllPrice();
    this.getList();
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
    this.getList(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return $common.api.share();
  }
})