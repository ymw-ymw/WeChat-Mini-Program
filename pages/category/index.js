// 引入请求方法
import { request } from "../../request/index.js";
Page({
  data: {
     cartgoryListLeft:[],
     cartgoryListRight:[],
    //  被点击的左侧菜单
      currentIndex: 0,
    // 右侧滚动条滚动到顶部
      scrolltop:0
  },
  // 用来后面存放本地内存中的数据
  Cates:[],
  
  onLoad: function (options) {
    /*
      1. 先判断有没有数据
      2. 没有就数据，在进行请求
      3，有旧的数据并且没有过期
    */
    const Cates = wx.getStorageSync("cates")
    if(!Cates){
      // 不存在，请求
      this.getCartgory()
    }else{
      // 判断数据是否过期
      if(Date.now()-Cates.time>1000 * 10){
        this.getCartgory()
      }else{
        // 将本地存储的数据，赋值给data里面的变量
        this.Cates = Cates.data;
        let cartgoryListLeft = this.Cates.map(v => v.cat_name);
        let cartgoryListRight = this.Cates[0].children
        this.setData({
          cartgoryListLeft: cartgoryListLeft,
          cartgoryListRight: cartgoryListRight
        })  
      }
    }  
  },

  // 左侧菜单点击事件
  currentcheng(e){
    const { index } = e.currentTarget.dataset;
    let cartgoryListRight = this.Cates[index].children
    this.setData({
      currentIndex:index,
      cartgoryListRight: cartgoryListRight,
      scrolltop:0
    })
  },

  // 获取分类数据
  getCartgory(){
    request({ url:"categories"})
    .then(res =>{  
        this.Cates = res.data.message;
        // 把接口的数据存储到本地存储中
        wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
        let cartgoryListLeft = this.Cates.map(v => v.cat_name);
        let cartgoryListRight = this.Cates[0].children
        this.setData({
          cartgoryListLeft : cartgoryListLeft,
          cartgoryListRight : cartgoryListRight         
        })  
    })
  }

})