/**
 * 写入token
 */
export function setToken(token) {
  console.log('Units-Auth SetToken:', token)
  return uni.setStorageSync('token', token)
}

/**
 * 读取token
 */
export function getToken() {
  return uni.getStorageSync('token')
}

/**
 * 判断是否登录
 * - 根据是否存贮了user键值的storage
 */
export function isLogined() {
  return uni.getStorageSync('token') != ""
}

/**
 * 清除登录信息
 */
export function clearToken() {
  return uni.removeStorageSync('token')
}

/**
 * 写入User Info
 */
export function setUserInfo(user) {
  console.log('SetUserInfo:', user)
  return uni.setStorageSync('user', user)
}

/**
 * 获取User Info
 */
export function getUserInfo() {
  return uni.getStorageSync('user')
}

/**
 * 清除登录信息
 */
export function clearUserInfo() {
  try{
    uni.removeStorageSync('user')
  }catch(e){
    console.log(e)
  }
}

export function logoutSyncStorage(){
  try{
    uni.removeStorageSync('token')
    uni.removeStorageSync('user')
  }catch(e){
    console.log(e)
  }
}
