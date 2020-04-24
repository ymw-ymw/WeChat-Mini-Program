import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";
Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      //  由于appid不一样，所以请求不到token，所以跟据文档，写了一个固定的 token
      // // 1 获取用户信息
      // const { encryptedData, rawData, iv, signature } = e.detail;
      // // 2 获取小程序登录成功后的code
      // const { code } = await login();
      // console.log(code)
      // const loginParams = { encryptedData, rawData, iv, signature, code };
      // console.log(loginParams)
      // //  3 发送请求 获取用户的token
      // const { token } = await request({ url: "users/wxlogin", data: loginParams, method: "post" });
      // console.log(this.token)
      // 4 把token存入缓存中 同时跳转回上一个页面
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync("token", token);
      // 跳回上一层也页面
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }

})