const data = require('./data')

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { email, phone, nick, type } = config.body
      let token_data = data.tokens[email]
      
      if(type == 'phone') {
        if(!data.tokens[phone]){
          data.users[phone] = {
            roles: ['user'],
            user_id: 'user_id_' + phone,
            introduction: '新添加一个用户',
            avatar: '',
            nick: nick,
            phone: phone
          }
          data.tokens[phone]  = {
            token : phone
          }
        }
        token_data = data.tokens[phone]
      }

      if(type == 'mpWeixin'){
        for(let i in data.tokens){ //@todo 暂时先随便取一个token，以后改成微信获取
          token_data = data.tokens[i]
          break;
        }
      }

      // mock error
      if (!token_data) {
        return {
          code: 999999,
          message: 'Account or password are incorrect.'
        }
      }

      let code = process.env.VUE_APP_CODE_SUCCESS
      if(!data.users[token_data.token].nick){
        code = process.env.VUE_APP_CODE_EMPTY_NICK
      }
      if(!data.users[token_data.token].phone){
        code = process.env.VUE_APP_CODE_EMPTY_PHONE
      }
      
      token_data.is_login = true

      return {
        code: code,
        message: 'success',
        data: token_data
      }
    }
  },

  // is login
  {
    url: '/user/is-login',
    type: 'post',
    response: config => {
      
      const token = config.headers['__user_token__']

      let is_login  = false;
      for(let i in data.tokens){
        if(data.tokens[i].token == token){
          is_login  = data.tokens[i].is_login
        }
      }

      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        data: {is_login}
      }
    }
  },

  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: config => {
      const token = config.headers['__user_token__']
      const info = data.users[token]

      // mock error
      if (!info) {
        return {
          code: process.env.VUE_APP_CODE_NOT_LOGIN,
          message: 'Login failed, unable to get user details.' + token
        }
      }

      let code = process.env.VUE_APP_CODE_SUCCESS
      if(!info.nick){
        code = process.env.VUE_APP_CODE_EMPTY_NICK
      }

      return {
        code: code,
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

  // user nick
  {
    url: '/user/nick',
    type: 'post',
    response: _ => {
      const token = _.headers['__user_token__']
      const { nick } = _.body
      data.users[token].nick = nick
      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        data: 'success'
      }
    }
  },

  // user phone
  {
    url: '/user/phone',
    type: 'post',
    response: _ => {
      const token = _.headers['__user_token__']
      const { phone } = _.body
      data.users[token].phone = phone
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
