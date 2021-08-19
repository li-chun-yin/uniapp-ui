
const tokens = {
  'ex@uni.dev': {
    token: 'ex-token'
  },
  'empty@uni.dev': {
    token: 'empty-token'
  },
  '10000000000': {
    token: 'ex-token'
  },
  '10000000001': {
    token: 'empty-token'
  }
}

const users = {
  'ex-token': {
    roles: ['user'],
    user_id: 'user_id1',
    introduction: '这个用户用来一般的页面测试测试',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nick: 'general'
  },
  'empty-token': {
    roles: ['user'],
    user_id: 'user_id2',
    introduction: '这个用户用来测试用户数据为空的时候的情况',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nick: 'empty'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { email, phone, type } = config.body
      let token_data = tokens[email]
      
      if(!token_data) {
        token_data = tokens[phone]
      }

      if(type == 'mpWeixin'){
        token_data = tokens['10000000000']
      }

      // mock error
      if (!token_data) {
        return {
          code: 999999,
          message: 'Account or password are incorrect.'
        }
      }

      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        message: 'success',
        data: token_data
      }
    }
  },

  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: config => {
      const token = config.headers['__user_token__']
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 5000,
          message: 'Login failed, unable to get user details.' + token
        }
      }

      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        data: info
      }
    }
  },

  // user avatar
  {
    url: '/user/avatar',
    type: 'post',
    response: _ => {
      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        data: 'success'
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        data: 'success'
      }
    }
  }
]
