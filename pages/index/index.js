// 引入请求方法
import {request} from "../../request/index.js"

wx-Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[],
    navigator_urls:''
  },
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

// navigator_url
  navigator_url(e){
    const { navigator_url } = e.currentTarget.dataset
    const rep1 = new RegExp('\\?query=(.*)', 'i')
    const navigator_urls = navigator_url.match(rep1)[1];//取 ?query=后面所有字符串
    this.setData({
      navigator_urls
    })
  },

// 获取楼层数据
  getFloorList(e){
    request({ url: "home/floordata" })
      .then(res => {       
        this.setData({
          floorList: res.data.message,       
        })
      })    
  },

  // 1. 获取分类导航数据
  getCateList(){
    request({ url: "home/catitems" })
      .then(res => {
        this.setData({
          cateList: res.data.message
        })
      })  
  },

  // 1. 获取轮播图数据
  getSwiperList(){
    request({ url: "home/swiperdata" })
      .then(res => {
        this.setData({
          swiperList: res.data.message
        })
      })
  }
})