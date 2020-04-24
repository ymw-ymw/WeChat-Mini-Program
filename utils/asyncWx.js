// promess 形式的getSetting
export const getSetting = () =>{
  return new Promise((resove, reject) => {
    wx.getSetting({
      success: (res) => {
        resove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// promise 形式的 chooseAddress
export const chooseAddress = () => {
  return new Promise((resove, reject) => {
    wx.chooseAddress({
      success: (res) => {
        resove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


/**
 * promise 形式  login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}


// promess 形式的openSetting
export const openSetting = () => {
  return new Promise((resove, reject) => {
    wx.openSetting({
      success: (res) => {
        resove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


/**
 *  promise 形式  showToast
 * @param {object} param0 参数
 */
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}


/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
