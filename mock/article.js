const data = require('./data')
const Mock = require('mockjs')

module.exports = [
  {
    url: '/article/index',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20, sort } = config.query

      let mockList = data.articleList.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-seq') {
        mockList = mockList.reverse()
      }

      let pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      let total   = mockList.length

      const token = config.headers['__user_token__']
      if(token == 'empty-token'){
        total = 0
        pageList = []
      }

      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        data: {
          total: total,
          items: pageList
        }
      }
    }
  },
  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { seq } = config.query
      for (const item of data.articleList) {
        if (item.seq === +seq) {
          return {
            code: process.env.VUE_APP_CODE_SUCCESS,
            data: item
          }
        }
      }
    }
  },
  {
    url: '/article/create',
    type: 'post',
    response: config => {
      const { title, desc, content } = config.body
      const token = config.headers['__user_token__']
      console.log(data.users, token, data.users[token])
      let atricle = Mock.mock({
        seq: '@increment',
        author: data.users[token].user_id,
        title: title,
        desc: desc,
        content: content,
        image: {url: '@image'},
        is_like: false,
        pv: 0,
        comment_num: 0,
        createtime: Math.round((new Date()).getTime() / 1000),
        updatetime: Math.round((new Date()).getTime() / 1000)
      })
      data.articleList.push(atricle)
      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        message: 'ok',
        data: {
          seq: atricle.seq
        }
      }
    }
  },
  {
    url: '/article/update',
    type: 'post',
    response: config => {
      const { seq, title, desc, content } = config.body
      for (const item of data.articleList) {
        if (item.seq === +seq) {
          item.title  = title
          item.desc  = desc
          item.content  = content
          item.updatetime  = Math.round((new Date()).getTime() / 1000)
        }
      }      

      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        message: 'ok'
      }
    }
  },
  {
    url: '/article/like',
    type: 'post',
    response: config => {
      const {article_seq} = config.body
      for (const item of data.articleList) {
        if (item.seq === +article_seq) {
          item.is_like = !item.is_like
          return {
            code: process.env.VUE_APP_CODE_SUCCESS,
            message: 'ok'
          }
        }
      }
    }
  }
]
