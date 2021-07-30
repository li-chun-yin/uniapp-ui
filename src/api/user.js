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
        setToken(res.data.data.token)
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
        code: process.env.VUE_APP_CODE_SUCCESS,
        type: 'local',
        data: user
      })
      return
    }
    uni.request({
      url: '/user/info',
      method: 'get',
      success: (res) => {
        setUserInfo(res.data.data)
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

export function avatarApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/user/avatar',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        avatar_id: data.avatar_id,
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

export function logoutApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/user/logout',
      method: 'post',
      success: (res) => {
        logoutSyncStorage()
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
