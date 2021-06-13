module.exports = [
  {
    url: '/upload',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'success',
        data: {
          url: '/static/logo.png',
          id: '1'
        }
      }
    }
  }
]
