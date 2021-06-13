import '@/api/interceptor'
import { setToken, setUserInfo, getUserInfo, logoutSyncStorage } from '@/utils/auth'

export function loginApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/user/login',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        email: data.email,
        captcha: data.captcha,
        nick: data.nick,
      },
      success: (res) => {
        if(res.data.code == 20000){
          setToken(res.data.data.token)
        }
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

export function infoApi(data) {
  return new Promise((resolve, reject) => {
    const user = getUserInfo()
    if(user){
      console.log("infoApi user:", user)
      resolve({
        code: 20000,
        type: 'local',
        data: user
      })
      return
    }
    uni.request({
      url: '/user/info',
      method: 'get',
      success: (res) => {
        if(res.data.code == 20000){
          setUserInfo(res.data.data)
        }
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

export function logoutApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/user/logout',
      method: 'post',
      success: (res) => {
        if(res.data.code == 20000){
          logoutSyncStorage()
        }
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
