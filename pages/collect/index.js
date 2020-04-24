
Page({
  data: {
    collect: [],
    tabs: [
      {
        id: 0,
        values: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        values: "品牌收藏",
        isActive: false
      },
      {
        id: 2,
        values: "店铺收藏",
        isActive: false
      },
      {
        id: 3,
        values: "浏览器足迹",
        isActive: false
      }
    ]
  
  },
  handletabsItemChang(e){
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },

  onShow: function () {
    const collect = wx.getStorageSync("collect")
    this.setData({
      collect
    })
  },
})