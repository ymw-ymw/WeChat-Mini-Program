
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: '',
    totalNum: ''
  },

  onShow: function () {
    // 1. 获取缓存中的收货地址信息  
    const address = wx.getStorageSync("addres")
    //获取缓存中商品的数据，渲染
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v =>v.checked)
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
    })
   this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  // 用户点击支付页面
  async handleOrderPay(){
    try{
      // 1.判断缓存中有没有token
      const token = wx.getStorageSync("token")
      // 判断有没有token
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return
      }
      // 由于无效token ，所以自己设置 订单编号
      const order_number = "HMDD20190802000000000422";
      // 通过token 和 order_number 获取微信支付的必要参数
      const pay = {
        "timeStamp": "1564730510",
        "nonceStr": "SReWbt3nEmpJo3tr",
        "package": "prepay_id=wx02152148991420a3b39a90811023326800",
        "signType": "MD5",
        "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
      };
      // 6 发起微信支付 
      //await requestPayment(pay);  
      // 查询后台是否支付成功
      //const res = await request({ url: "my/orders/chkOrder", method: "POST", data: { order_number } });
      console.log("支付成功")
      await showToast({ title: "支付成功" });
      // 8 手动删除缓存中 已经支付了的商品
      // 为后面的订单查询提供数据
      
      let newCart = wx.getStorageSync("cart");
      // 获取 已支付 的商品数据 
      const oldCart = this.data.cart 
      wx.setStorageSync("oldCart", oldCart);
      // 获取 未支付 的商品数据
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);
     
      // 9 支付成功了 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index?type=1'
      });
    } catch (error) {
      console.log(error);
    }
    

  }
})