import {getToken} from '@/utils/auth'

uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url
    args.url = process.env.VUE_APP_BASE_API+args.url
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
      uni.showModal({
        content: "请重新登录",
        showCancel: false,
        success: res => {
          uni.navigateTo({
            url: 'pages/user/login?totype=back'
          })
        }
      });
      return false;
    }
    if(args.data.code != process.env.VUE_APP_CODE_SUCCESS){
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
    return false;
  },
  complete(res) {
    console.log('interceptor-complete',res)
  }
})
