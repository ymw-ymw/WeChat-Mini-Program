// 同时发送异步请求的次数
let ajaxTime = 0
export const request = (parms) =>{
  // // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  // let header = { ...params.header };
  // if (params.url.includes("/my/")) {
  //   // 拼接header 带上token
  //   header["Authorization"] = wx.getStorageSync("token");
  // }

  ajaxTime ++
  // 显示一个加载中效果
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  // 定义公共区域
  const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1/"
  return new Promise((resove,reject) =>{
    wx.request({
      ...parms,
      // 将 parms 参数结构
      url:baseurl+parms.url,
      success: (res) => {
        resove(res)
      },
      fail: (err) =>{
        reject(err)
      },
      complete:() =>{
        ajaxTime--
        if (ajaxTime == 0){
          wx.hideLoading()
        }
      }
    })
  })
}
