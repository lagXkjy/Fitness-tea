// component/courseInfoBottom/courseInfoBottom.js
Component({
  properties: {
    tabText: {
      type: String,
      value: ''
    },
    showTime: { //显示时间
      type: String
    },
    isOrder: {
      type: String,
      value: ''
    },
    tabIndex: {
      type: Number,
      value: 0
    },
    isSet: {  //设置上课时间
      type: Boolean,
      value: false,
    },
    isCount: { //显示预约人数
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  methods: {
    clickBtn() {
      this.triggerEvent('check', null);
    },
    clickSet() {
      this.triggerEvent('setTime')
    },
  }
})
