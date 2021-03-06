// pages/everyday/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    params: {
      pageNum: 1,
      pageSize: 3
    },
    pages: 0,
    nomore: true,
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var baseUrl = wx.getStorageSync('baseUrl')
    this.setData({
      baseUrl: baseUrl
    })

    // 开始加载数据
    this.loadData(1)
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多的数据
    var pages = this.data.pages;
    var pageNum = this.data.params.pageNum;
    if (pageNum < pages) {
      this.loadData(pageNum + 1);
      if (pageNum + 1 == pages) {
        this.setData({
          nomore: false
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // **************************************
  // ************ 自定义方法 ***************
  // **************************************

  /**
   * 跳转到详情页面
   */
  gotoDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id
    })
  },

  /**
   * 加载数据
   */
  loadData: function (pageNum) {
    var baseUrl = this.data.baseUrl
    var that = this;

    wx.showLoading({
      title: '努力加载中'
    })

    var $param = this.data.params;

    $param.pageNum = pageNum

    this.setData({
      params: $param
    })

    wx.request({
      url: baseUrl + '/funimg/api/funimg/lists',
      method: 'GET',
      data: $param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading() //完成停止加载
        
        var list = res.data.list;
        if (list != null && list.length > 0) {
          var newDataList = list;
          if (pageNum > 1) {
            let dataList = that.data.dataList;
            // 追加到已有数据后面
            newDataList = dataList.concat(list);
          }
          that.setData({
            dataList: newDataList
          });
        }

        wx.hideLoading()
        // console.log("总页数: " + res.data.pages)
        that.setData({
          pages: res.data.pages
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '错误',
          content: '网络连接失败，请检查',
          showCancel: false
        })
      }
    })
  }
  
})