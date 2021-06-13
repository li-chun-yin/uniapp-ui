import '@/api/interceptor'

export function captchaApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/email/captcha', //仅为示例，并非真实接口地址。
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        email: data.email,
        type: data.type
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err)=>{
        reject(err)
      },
      complete(done) {
        console.log(done)
      }
    })
  });
}
