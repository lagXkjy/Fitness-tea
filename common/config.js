// const host = 'fitnessapp.1-zhao.com';
// const host = 'test.1-zhao.com'; //测试服务器
// const host = 'TestFitnessapp.1-zhao.fun';
const host = 'www.onegroupsfit.com'
const referer = `https://${host}`;
const phoneReg = /^1[34578]\d{9}$/; // 正则手机号码
const teaSrc = `${referer}/Content/CoachImgs/`; //教练图片
const courseSrc = `${referer}/Content/CorImgs/`; //课程图片
const activitySrc = `${referer}/Content/AtyImgs/`; //活动图片
const shopSrc = `${referer}/Content/StoreImgs/`; //门店图片
const images = `${referer}/Content/Images/`; // my页面个人信息背景图
const bannerSrc = `${referer}/Content/BanImgs/`; //banner图片
module.exports = {
  images: images,
  phoneReg: phoneReg,
  teaSrc: teaSrc,
  courseSrc: courseSrc,
  activitySrc: activitySrc,
  shopSrc: shopSrc,
  bannerSrc: bannerSrc,
  /**
   * 首页
   */

  //● 教练首页，获取所属门店信息
  GetCoaStoreInfo: `${referer}/ltp/Store/GetCoaStoreInfo`,
  //● 教练首页，获取未来一周的课程表
  GetCoaCorInfos: `${referer}/ltp/Courses/GetCoaCorInfos`,
  //● 获取小程序首页banner图片
  GetBanInfos: `${referer}/ltp/LobBanner/GetBanInfos`,
  //● 门店详情获取
  GetStoreInfo: `${referer}/ltp/Store/GetStoreInfo`,
  //● 学生端首页--城市信息获取
  GetCityInfos: `${referer}/ltp/City/GetCityInfos`,
  //● 学生首页--获取某城市的门店列表
  GetStoreInfos: `${referer}/ltp/Store/GetStoreInfos`,
  //● 获取门店信息
  GetStoreAbsInfo: `${referer}/ltp/Store/GetStoreAbsInfo`,
  //● 学员--获取课程信息
  GetStrCourseInfo: `${referer}/ltp/Courses/GetStrCourseInfo`,
  //● 学员--获取门店私课信息
  GetStrPriCourseInfos: `${referer}/ltp/Courses/GetStrPriCourseInfos`,
  //● 支付--获取课程信息
  GetCourseAbsInfo: `${referer}/ltp/Courses/GetCourseAbsInfo`,
  //● 支付--获取学员信息
  GetStuMemberInfo: `${referer}/ltp/StuMember/GetStuMemberInfo`,
  //● 支付--统一下单
  PostAnOrder: `${referer}/ltp/Order/PostAnOrder`,
  //● 支付--取消下单或支付失败
  PlaceAnOrderFailed: `${referer}/ltp/Order/PlaceAnOrderFailed`,
  //● 支付--支付成功后调用
  PayMentSuccess: `${referer}/ltp/Order/PayMentSuccess`,


  /**
   * 活动
   */
  //● 获取活动信息列表
  GetAtyInfos: `${referer}/ltp/Activity/GetAtyInfos`,
  //● 获取活动详细信息
  GetAtyInfo: `${referer}/ltp/Activity/GetAtyInfo`,

  /**
   * 我的
   */
  //用户登录
  Login: `${referer}/ltp/Home/Login`,
  //获取教练openId
  GetTeaUserOpenId: `${referer}/ltp/UserInfo/GetTeaUserOpenId`,
  //获取用户绑定教练情况
  GetIsBinded: `${referer}/ltp/Coach/GetIsBinded`,
  //● 修改用户的微信头像与昵称
  PutUserNiAv: `${referer}/ltp/UserInfo/PutUserNiAv`,
  //● 教练--绑定教练信息
  BindCoachInfo: `${referer}/ltp/Coach/BindCoachInfo`,
  //● 获取用户头像昵称
  GetHeadPAVA: `${referer}/ltp/Coach/GetHeadPAVA`,
  //● 获取教练个人信息
  GetCoachInfo: `${referer}/ltp/Coach/GetCoachInfo`,
  //● 获取教练团课信息
  GetGroupCorInfos: `${referer}/ltp/Courses/GetGroupCorInfos`,
  //● 获取团课详细信息
  GetGroupCorInfo: `${referer}/ltp/Courses/GetGroupCorInfo`,
  //● 根据openId获取某教练的私课信息
  GetPrivateCorInfos: `${referer}/ltp/Courses/GetPrivateCorInfos`,
  //● 获取私课详细信息
  GetPrivateCorInfo: `${referer}/ltp/Courses/GetPrivateCorInfo`,
  //● 获取某教练团课的所有订单
  GetCoaGroupOdrInfos: `${referer}/ltp/Order/GetCoaGroupOdrInfos`,
  //● 根据订单ID查询课程信息
  GetCorInfo: `${referer}/ltp/Courses/GetCorInfo`,
  //● 获取订单详情
  GetOrderInfo: `${referer}/ltp/Order/GetOrderInfo`,
  //● 获取某教练私课的所有成功的订单
  GetCoaPrivateOdrInfos: `${referer}/ltp/Order/GetCoaPrivateOdrInfos`,
  //● 根据订单ID获取私课课程信息
  GetPriCorInfo: `${referer}/ltp/Courses/GetPriCorInfo`,
  //● 获取某学生报名的私课的上课时间表
  GetPriCorCct: `${referer}/ltp/CorClaTime/GetPriCorCct`,
  //● 结束私课已经上完课的课程时间表
  FinishPriCorCct: `${referer}/ltp/CorClaTime/FinishPriCorCct`,
  //● 私课--修改未开始的上课时间
  AlterPriCorCct: `${referer}/ltp/CorClaTime/AlterPriCorCct`,
  //● 私课--新增一条上课时间
  PostPriCorCct: `${referer}/ltp/CorClaTime/PostPriCorCct`,
  //● 教练--我的收入--获取总收入
  GetCoaAllIncome: `${referer}/ltp/Order/GetCoaAllIncome`,
  //● 教练--我的收入--收入明细查看
  GetCoaIncomes: `${referer}/ltp/Order/GetCoaIncomes`,
  //● 学员--我的团课信息
  GetMyGroupCorInfos: `${referer}/ltp/Order/GetMyGroupCorInfos`,
  //● 学员--我的私课信息
  GetMyPrivateCorInfos: `${referer}/ltp/Order/GetMyPrivateCorInfos`,
  //● 学员--删除我的订单信息
  DeleteMyOrderInfo: `${referer}/ltp/Order/DeleteMyOrderInfo`,




}