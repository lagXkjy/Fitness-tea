const $common = require('../../../common/common.js');
Page({
  data: {
    images: $common.config.images,
    teaList: [{
      title: '我的团课',
      image: '/images/course.png',
      url: '/pages/my/myCourseListCocah/myCourseListCocah'
    }, {
      title: '我的私课',
      image: '/images/my-search.png',
      url: '/pages/my/myCourseListPrivateCoach/myCourseListPrivateCoach'
    }, {
      title: '我的团课订单',
      image: '/images/my-time.png',
      url: '/pages/my/myCourseOrderCocah/myCourseOrderCocah'
    }, {
      title: '我的私课订单',
      image: '/images/my-info.png',
      url: '/pages/my/myCoursePrivateCocah/myCoursePrivateCocah'
    }, {
      title: '我的收入',
      image: '/images/price.png',
      url: '/pages/my/myIncomeCocah/myIncomeCocah'
    },
    ],
    teaSrc: $common.config.teaSrc,
    CoaName: '',
    CoaHeadPic: '',
  },
  skipMyInfoCoach() { //查看个人资料
    wx.navigateTo({
      url: '/pages/my/myInfoCoach/myInfoCoach',
    })
  },
  skip(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  init() {
    this.getHead();
  },
  getHead() { //获取头像
    let userType = this.data.userType;
    if (userType == 1) return;
    $common.api.request(
      'POST',
      $common.config.GetHeadPAVA,
      {
        openId: wx.getStorageSync('openId')
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            CoaName: res.data.CoaName,
            CoaHeadPic: res.data.CoaHeadPic
          })
        }
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            CoaHeadPic: res.data.CoaHeadPic,
            CoaName: res.data.CoaName
          })
        }
      },
      (res) => {

      },
      wx.getStorageSync('Ticket')
    )
  },
  onLoad: function (options) {

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
    let userType = wx.getStorageSync('userType');
    this.setData({
      userType: userType
    })
    this.init();
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