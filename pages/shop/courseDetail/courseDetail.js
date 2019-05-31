const $common = require('../../../common/common.js');
const wxParse = require('../../../libs/wxParse/wxParse.js');
Page({
  data: {
    courseSrc: $common.config.courseSrc,
    teaSrc: $common.config.teaSrc,
  },
  checkAddress() { //查看地图
    $common.api.geocoder(
      this.data.corInfo.CorAdress,
      (res) => {
        let obj = {
          latitude: res.result.location.lat,
          longitude: res.result.location.lng
        }
        $common.api.openLocation(obj);
      });
  },

  getGroup() { //团
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.GetGroupCorInfo,
      {
        corId: this.data.corId
      },
      (res) => {
        if (res.data.res) {
          let CorBanners = res.data.CorBanners;
          for (let i = 0, len = CorBanners.length; i < len; i++) {
            CorBanners[i].image = CorBanners[i].CbiImgName;
          }
          let corInfo = res.data.corInfo;
          let start = $common.api.timeStamp(corInfo.CctStaTime);
          let end = $common.api.timeStamp(corInfo.CctEndTime);
          corInfo.showTime = `${start.y}.${start.m}.${start.d} ${start.h}:${start.mi}-${end.h}:${end.mi}`;
          wxParse.wxParse('article', 'html', corInfo.CorDesp, this, 5);
          corInfo.CorRePrice = parseFloat(corInfo.CorRePrice).toFixed(2);
          this.setData({
            CorBanners: CorBanners,
            corInfo: corInfo
          })
        } else {
          switch (+res.data.errType) {
            case 16:
              $common.api.showModal('该课程已下架，教练信息不存在');
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
      },
      wx.getStorageSync('Ticket')
    )
  },
  getNoGroup() { //私
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.GetPrivateCorInfo,
      {
        corId: this.data.corId
      },
      (res) => {
        if (res.data.res) {
          let CorBanners = res.data.CorBanners;
          for (let i = 0, len = CorBanners.length; i < len; i++) {
            CorBanners[i].image = CorBanners[i].CbiImgName;
          }
          let corInfo = res.data.corInfo;
          wxParse.wxParse('article', 'html', corInfo.CorDesp, this, 5);
          corInfo.CorRePrice = parseFloat(corInfo.CorRePrice).toFixed(2);
          this.setData({
            CorBanners: CorBanners,
            corInfo: corInfo
          })
        } else {
          switch (+res.data.errType) {
            case 16:
              $common.api.showModal('该课程已下架，教练信息不存在');
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
      },
      wx.getStorageSync('Ticket')
    )
  },
  init() {
    let isGroup = this.data.isGroup;
    if (isGroup) {
      this.getGroup();
    } else {
      this.getNoGroup();
    }

  },
  onLoad: function (options) {
    let corId = options.corId;
    let isGroup = parseInt(options.isGroup) === 1 ? true : false; //1团0私
    this.data.corId = corId;
    // let strId = options.strId && options.strId;
    // this.data.strId = strId;
    this.setData({
      isGroup: isGroup
    })
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
    this.setData({
      userType: wx.getStorageSync('userType')
      // userType: 1
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
    this.init();
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