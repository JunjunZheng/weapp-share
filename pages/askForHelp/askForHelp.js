import {
  searchGoods
} from '../../api/search'
import {
  createGoods
} from '../../models/good'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    goods: [],
    page: 1, //当前的第几页
    pages: 10,
    total: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow: function () {
    this.setData({
      goods: [],
      page: 1
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  // search组件
  onSearch() {
    this.setData({
      goods: []
    })
    this._searchGoods()
  },
  onClick() {
    this.setData({
      goods: []
    })
    this._searchGoods()
  },
  onClean() {
    this.setData({
      goods: []
    })
  },
  // 搜索处理
  _searchGoods() {
    Toast.loading({
      mask: true,
      message: '搜索中...'
    })
    searchGoods(this.data.value, this.data.page).then(res => {
      Toast.clear();
      if (res.data.length == 0) {
        Toast('没有搜索到相关内容');
        return
      } else {
        let good = this.normalGood(res.data)
        let goods = this.data.goods
        goods = goods.concat(good)
        this.setData({
          total: res.total,
          page: res.page,
          pages: res.pages,
          goods: goods
        })
      }
    })
  },
  normalGood(data) {
    let t = []
    data.forEach((i) => {
      t.push(createGoods(i))
    })
    return t
  },
  onPullUp() {
    let page = this.data.page + 1
    this.setData({
      page
    })
    if (this.data.pages >= this.data.page) {
      this._searchGoods()
    }
  },
  // 选择
  onSelectGood(e) {
    let gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/help-detail/help-detail',
      events: {},
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('selectGood', gid)
      }
    })
  }
})