const data = require('./data')

module.exports = [
  {
    url: '/phone/captcha',
    type: 'post',
    response: config => {
      const { phone } = config.body

      // check
      const is_first_login = !(phone in data.tokens)

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
