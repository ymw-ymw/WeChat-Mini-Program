// pages/user/index.js
Page({
  data: {
    userinfo:{},
    collectNums:0
  },
  onShow(){
    // 用户信息
    const userinfo = wx.getStorageSync("userinfo")
    this.setData({
      userinfo
    })

    //  收藏商品的信息
    const collect = wx.getStorageSync("collect") || [];
    this.setData({ userinfo, collectNums: collect.length });
  }

})