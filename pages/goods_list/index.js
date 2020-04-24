import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    // 接口列表数据
    goodsList:[],
    tabs:[{
      id:0,
      values:"综合",
      isActive:true
    }, {
      id: 1,
      values: "销量",
      isActive: false
      }, {
        id: 2,
        values: "价格",
        isActive: false
      }],
  },
  // 总页数
  totalPages: 1,

  // 请求接口的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodsList()
  },

  //监听下拉刷新事件
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1,
    this.getGoodsList()
  },

  // 监听上拉触底事件
  onReachBottom(){
    // 判断有没有下一页
    if (this.QueryParams.pagenum >= this.totalPages){
      wx.showToast({
        title: '没有数据了',
      })
    }else{
      this.QueryParams.pagenum += 1;
      this.getGoodsList()
    }
  },

  // 根据组件传过来的 index 来改变是否显示下红线边框
  handletabsItemChang(e){
    const {index} = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive=false)
    this.setData({
      tabs: tabs
    })
  },

  // 获取接口数据
  async getGoodsList(){
    const res = await request({ url: "goods/search", data: this.QueryParams });
    // 获取 总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      // 拼接了数组
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();
  }
})