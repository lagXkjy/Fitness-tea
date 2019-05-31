const $common = require('../../../common/common.js');
Page({
  data: {
    shopSrc: $common.config.shopSrc,
    teaSrc: $common.config.teaSrc,
    bannerSrc: $common.config.bannerSrc,
    areaList: [],
    areaIndex: 0,
    storeInfos: [], //门店列表
    store: '',
    corInfos: [], //教练课程表
  },
  areaChange(e) { //门店地点切换
    this.setData({
      areaIndex: +e.detail.value,
      storeInfos: []
    });
    this.getShoplist();
  },
  skipShopDetail() { //点击了解
    wx.navigateTo({
      url: `/pages/shop/shopDetail/shopDetail?strId=${this.data.store.StrId}`,
    })
  },
  skipCourseList(e) {  //跳转到门店详情
    let index = e.currentTarget.dataset.index,
      storeInfos = this.data.storeInfos;
    wx.navigateTo({
      url: `/pages/shop/courseList/courseList?strId=${storeInfos[index].StrId}`,
    })
  },
  clickList(e) {
    let index = e.currentTarget.dataset.index;
    let corInfos = this.data.corInfos;
    wx.navigateTo({
      url: `/pages/shop/courseDetail/courseDetail?corId=${corInfos[index].CorId}&isGroup=${corInfos[index].CorType == 0 ? 0 : 1}`, //CorType 0 私课 1 2 团课
    })
  },
  getShopInfo() { //获取门店信息
    let userType = wx.getStorageSync('userType');
    this.setData({
      userType: userType
    });
    $common.api.request(
      'POST',
      $common.config.GetCoaStoreInfo,
      {
        openId: wx.getStorageSync('openId')
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            store: res.data.store
          })
        } else {
          switch (parseInt(res.data.errType)) {
            case 6:
              // $common.api.showModal('暂无数据');
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
      },
      wx.getStorageSync('Ticket')
    )
  },
  weekChange(e) {  //获取当前时间下的课程
    let time = e.detail.time;
    this.setData({
      corInfos: []
    })
    $common.loading();
    $common.api.request(
      'POST',
      $common.config.GetCoaCorInfos,
      {
        openId: wx.getStorageSync('openId'),
        corTime: time
      },
      (res) => {
        if (res.data.res) {
          let corInfos = res.data.corInfos;
          for (let i = 0, len = corInfos.length; i < len; i++) {
            corInfos[i].image = corInfos[i].CoaHeadPic;
            corInfos[i].info = corInfos[i].CorAbstract;
            corInfos[i].name = corInfos[i].CorName;
            let start = $common.api.timeStamp(corInfos[i].CctStaTime);
            let end = $common.api.timeStamp(corInfos[i].CctEndTime);
            corInfos[i].time = `${start.h}:${start.mi}-${end.h}:${end.mi}`;
          }
          this.setData({
            corInfos: corInfos
          })
        } else {
          if (res.data.errType !== 6) {
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
  getPageData() { //获取页面信息

  },
  init() {
    wx.showLoading({ title: '请求中...' })
    $common.api.request(
      'POST',
      $common.config.GetIsBinded,
      {
        openId: wx.getStorageSync('openId')
      },
      (res) => {
        if (res.data.res) {
          let bCount = res.data.bCount;
          if (+res.data.bCount === 0) { //未绑定，前去绑定
            wx.redirectTo({
              url: '/pages/my/register/register',
            })
          } else { //大于0，已绑定请求页面
            this.getShopInfo();
          }
        } else {
          $common.err1();
        }
      },
      (res) => {
        api.showModal('网络不给力，请稍后重试！');
      },
      (res) => {
        wx.hideLoading();
      },
      wx.getStorageSync('Ticket')
    )
  },
  onLoad: function (options) {
    $common.getOpenId(this.init.bind(this)); //获取openid
  },

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
    $common.getOpenId(this.init.bind(this)); //获取openid
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