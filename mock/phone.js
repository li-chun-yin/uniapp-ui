const Mock = require('mockjs')
module.exports = [
  {
    url: '/phone/captcha',
    type: 'post',
    response: config => {
      const { phone, type } = config.body

      // check
      const is_first_login = phone != 'ex@uni.dev'

      return {
        code: 20000,
        message: 'success',
        data: {
          is_first_login
        }
      }
    }
  }
]
