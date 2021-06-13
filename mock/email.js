const Mock = require('mockjs')
module.exports = [
  {
    url: '/email/captcha',
    type: 'post',
    response: config => {
      const { email, type } = config.body

      // check
      const is_first_login = email != 'ex@uni.dev'

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
