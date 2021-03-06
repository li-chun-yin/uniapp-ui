import {getToken, clearToken} from '@/utils/auth'

uni.addInterceptor('request', {
  invoke(args) {
    console.log(args.url)
    // request 触发前拼接 url
    args.url = process.env.VUE_APP_BASE_API + args.url
    if(args.header == undefined){
      args.header = {};
    }
    let token = getToken()
    if(token) {
      args.header['__USER_TOKEN__'] = getToken()
    }
  },
  success(args) {
    // 没有登录
    if(args.data.code == process.env.VUE_APP_CODE_NOT_LOGIN){
      clearToken()
      uni.navigateTo({
        url: '/pages/user/login?totype=back'
      })
      return false;
    }else if(args.data.code == process.env.VUE_APP_CODE_EMPTY_NICK || (args.data.data && args.data.data.is_seted_nick == false)){
      console.log(args)
      uni.navigateTo({
        url: '/pages/user/nick/form'
      })
      return true;
    }else if(args.data.code == process.env.VUE_APP_CODE_EMPTY_PHONE || (args.data.data && args.data.data.is_seted_phone == false)){
      console.log(args)
      uni.navigateTo({
        url: '/pages/user/phone/form'
      })
      return true;
    }else if(args.data.code != process.env.VUE_APP_CODE_SUCCESS){
      uni.showModal({
        content: args.data.message,
        showCancel: false,
      });
      return false;
    }
  },
  fail(err) {
    uni.showModal({
      content: "发生异常.",
      showCancel: false,
    });
  },
  complete(res) {
    console.log('interceptor-complete',res)
  }
})
