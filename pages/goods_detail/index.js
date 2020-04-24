import { request } from "../../request/index.js";

Page({
  data: {
    GoodsDetailList:[],
    isCollect : false    
  },
  // 商品信息
  GoodsInfo: {},
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id)
  },
  onShow() {
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
  },

  // 点击 商品收藏图标
  handleCollect() {
    let isCollect = false;
    // 1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if (index !== -1) {
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })


  },

  // 点击加入购物车
  addshoping(){  
    // 获取缓存中的购物车的数据 数组格式
    let cart = wx.getStorageSync("cart")||[];
    // 2. 判断商品对象 是否存在于购物车数组
    let index = cart.findIndex(v=> v.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      // 不存在， 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else{
      // 已经存在购物车数据 执行num++
      cart[index].num ++;
    }
    wx.setStorageSync("cart", cart)
    // 后面订单 页面 全部 订单要用
    wx.setStorageSync("newCart", cart)
    // 弹窗提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      // 防止用户疯狂点击按钮
      mask: true,
    })
  },

  // 点击轮播图放大预览效果
  handlePrevewImage(e){
    const current = e.currentTarget.dataset.url
    const urls = this.GoodsInfo.pics.map(v =>v.pics_mid)
    wx-wx.previewImage({
      current: current,
      urls: urls
    })
  },

  // 获取接口数据
  getGoodsDetail(goods_id){
    request({ url: "goods/detail", data: { goods_id}})
      .then(res => {   
          // 赋值给图片预览数组
          this.GoodsInfo = res.data.message
          this.setData({
            GoodsDetailList: {
              goods_name: res.data.message.goods_name,
              goods_price: res.data.message.goods_price,
              // iphone 部分手机不支持 webp 格式
              goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
              pics: res.data.message.pics
            }
          })
      })
  }
      
})