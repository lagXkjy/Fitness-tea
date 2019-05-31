const $common = require('../../../common/common.js');
Page({
  data: {
    flag: true
  },
  start(e) {
    this.data.start = e.detail;
  },
  end(e) {
    this.data.end = e.detail;
  },
  newAdd() {
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.PostPriCorCct,
      {
        corId: this.data.corId,
        codId: this.data.codId,
        startTime: this.data.start,
        endTime: this.data.end
      },
      (res) => {
        if (res.data.res) {
          wx.navigateBack();
        } else {
          switch (+res.data.errType) {
            case 10:
              $common.api.showModal('上课时间段请保持在同一天内');
              break;
            case 12:
              $common.api.showModal('该时间段已添加，请重新选择');
              break;
            case 13:
              $common.api.showModal('私课时间段选择已满');
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
  reverse() { //修改
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.AlterPriCorCct,
      {
        cctId: this.data.cctId,
        startTime: this.data.start,
        endTime: this.data.end
      },
      (res) => {
        if (res.data.res) {
          wx.navigateBack();
        } else {
          switch (+res.data.errType) {
            case 10:
              $common.api.showModal('上课时间段请保持在同一天内');
              break;
            case 11:
              $common.api.showModal('请选择正确的时间段');
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
        $common.hide();
        this.data.flag = true;
      },
      wx.getStorageSync('Ticket')
    )
  },
  submit() { //提交
    if (!this.data.flag) return;
    this.data.flag = false;
    let start = this.data.start;
    let end = this.data.end;
    if (!start) {
      $common.api.showModal('请选择开始时间');
      this.data.flag = true;
      return;
    }
    if (!end) {
      $common.api.showModal('请选择结束时间');
      this.data.flag = true;
      return;
    }
    let iphone = wx.getSystemInfoSync();
    let s = `${start}:00`,
      n = `${end}:00`;
    if (iphone.system.indexOf('iOS') != -1) { //ios系统
      s = s.replace(/\-/g, '/');
      n = n.replace(/\-/g, '/');
    }
    s = new Date(s);
    n = new Date(n);
    let st = s.getTime(),
      et = n.getTime();
    if (et <= st) {
      $common.api.showModal('请选择正确的时间段');
      this.data.flag = true;
      return;
    }
    if (s.getFullYear() != n.getFullYear() || s.getMonth() != n.getMonth() || s.getDate() != n.getDate()) {
      $common.api.showModal('上课时间段请保持在同一天内');
      this.data.flag = true;
      return;
    }
    if (this.data.isAdd === 1) {
      this.newAdd();
    } else {
      this.reverse();
    }
  },
  onLoad: function (options) {
    let isAdd = +options.isAdd;
    if (isAdd === 1) { //设置，添加
      this.data.corId = options.corId;
      this.data.codId = options.codId;
    } else { //修改
      this.data.cctId = options.cctId;
    }
    this.data.isAdd = isAdd;
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
  onShareAppMessage: function () {
    return $common.api.share();
  }
})