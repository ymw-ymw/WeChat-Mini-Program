Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:'',
    totalNum:''
  },
  
  onShow:function(){
    /* 
    1. 获取缓存中的收货地址信息
    2. 给data复制值
    */
    const address = wx.getStorageSync("addres")
    this.setData({
      address
    })
    //获取缓存中商品的数据，渲染
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart)
  },
  
  // 用户权限获取
  heandleChooseAddress(){
    wx.getSetting({
      success: (res) =>{
        const scopeAddress = res.authSetting["scope.address"];
        if(scopeAddress === false){
          wx.openSetting({
            success: (res) => {
            }
          })
        }
        wx.chooseAddress({
          success: (res) => {
            res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo;
            wx.setStorageSync("addres", res)
          }
        })
      }
    })
  },

  // 商品的选中,更改底部的状态
  handeItemChange(e){
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v =>v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked;
    //调用封装的方法
    this.setCart(cart)
  },

  // 全选或者反选事件
  handleItemAllCheck(){
    // 1. 获取data中的数据
    let { cart, allChecked} = this.data
    // 2. 修改值
    allChecked = !allChecked;
    // 循环修改cart数组中的值，选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4. 把修改过的值，都填充会缓存中
    this.setCart(cart)
  },

  // 商品数量的增加和修改
  handleItemNumEdit(e){
    let {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v =>v.goods_id == id);  
    // 当购物车数量为1 的话，用户点击的还是减 1 ，那么询问用户是否删除
    if (cart[index].num === 1 && operation === -1){
      wx.showModal({
        title: '提示',
        content: '请问是否删除这个商品',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          } else if (res.cancel) {
            // 用户点击了取消，将商品数量重定为 1
            cart[index].num = 1;
            this.setCart(cart)
          }
        } 
      })
    }else{
      cart[index].num += operation;
      // 设置数据回data和缓存中
      this.setCart(cart)
    }
  },

  // 结算购物车，点击事件
  handlePay(){
    // 1. 判断有没有收货地址
    const {address,totalNum} = this.data;
    if (!address.userName){
      wx.showToast({
        title: '您还没',
        icon: 'success',
      })
      return;
    }
    if (totalNum == 0){
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'success',
      })
      return;
    }
    wx-wx.navigateTo({
      url: '/pages/pay/index',
    })
  },

  // 封装 计算 底部总价格，总数量，是否全选
  setCart(cart){
    wx.setStorageSync("cart", cart)
    // 是否全选
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
  }

})