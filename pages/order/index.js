import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs: [
      {
        id: 0,
        values: "全部",
        isActive: true
      },
      {
        id: 1,
        values: "待付款",
        isActive: false
      },
      {
        id: 2,
        values: "待发货",
        isActive: false
      },
      {
        id: 3,
        values: "退款/退货",
        isActive: false
      }
    ],
    cart:[]
  },

  // 请求商品列表的数据， 需要获取 token来发送请求， 
  onShow(options) {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3 获取url上的type参数
    const { type } = currentPage.options;
    // 4 激活选中页面标题 当 type=1 index=0 
    this.changeTitleByIndex(type - 1);
    this.getOrders(type );
  },

  // 获取订单列表的方法
  async getOrders(type) {
    //  无效的token
    // const res = await request({ url: "my/orders/all", data: { type } });
    // 改直接用 缓存中 cart 中的数据
    if (type == 1){
      const cart = wx.getStorageSync("newCart")     
      this.setData({
        cart
      })   
    } else if (type == 2) {
      const cart = wx.getStorageSync("cart")
      this.setData({
        cart
      })
    } else if (type == 3){
      const cart = wx.getStorageSync("oldCart") 
      this.setData({
        cart
      })    
    }
    const { cart} = this.data
    this.setData({
      orders: cart.map(v => ({ ...v, create_time_cn: (new Date(v.add_time * 1000).toLocaleString()) }))
    })
  },

  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {  
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },

  // 改变 标题 下划线
  handletabsItemChang(e){
    const { index } = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs: tabs
    })
    this.getOrders(index+1)
  }


})