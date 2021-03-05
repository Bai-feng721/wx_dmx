import cookies from 'weapp-cookie'

//定义请求地址
// const host = 'https://x.lzsgaj.cn/dmx/';
const host = 'https://gat.gansu.gov.cn:28082/dmx/';
// const host = 'http://192.168.1.116:18080/dmx/';
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync("token")
    let headers = {
      'content-type': 'application/json'
    };
    if (token) {
      headers = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    } else {

    }
    let isShowLoading = false;
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers,
      success: function(res) {
				// console.log(res)
        if (isShowLoading) {
          wx.hideLoading()
          isShowLoading = false;
        }
        resolve(res.data)
      },
      fail: function(error) {
        console.log(error)
       if (isShowLoading) {
         wx.hideLoading()
         isShowLoading = false;
       }
        reject(false)
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  })
}

function get(obj) {
  return request(obj.url, 'GET', obj.data)
}

function post(obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post
}
