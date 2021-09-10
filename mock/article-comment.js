const data = require('./data')
const Mock = require('mockjs')

module.exports = [
  {
    url: '/article-comment/index',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20, request_type, sort } = config.query

      let mockList = data.articleCommentList.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      let limit_z = limit
      if(request_type == 'MY_COMMENT'){
        limit_z = Math.round(Math.random())
      }

      if (sort === '-seq') {
        mockList = mockList.reverse()
      }

      let pageList = mockList.filter((item, index) => index < limit_z * page && index >= limit_z * (page - 1))
      let total   = mockList.length

      const token = config.headers['__USER_TOKEN__']
      if(token == 'empty-token'){
        total = 0
        pageList = []
      }

      if(request_type == "REPLY"){
        for( var i in pageList ){
          pageList[i].replys = []
          pageList[i].reply_num = 0
        }
      }

      return {
        code: 20000,
        data: {
          total: total,
          items: pageList
        }
      }
    }
  },
  {
    url: '/article-comment/articles',
    type: 'get',
    response: config => {
      const { user_id, order_seq, page = 1, limit = 20 } = config.query

      let pageList = data.articleList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      let total   = data.articleList.length

      const token = config.headers['__USER_TOKEN__']
      if(token == 'empty-token'){
        total = 0
        pageList = []
      }

      return {
        code: 20000,
        data: {
          total: total,
          items: pageList
        }
      }
    }
  },
  {
    url: '/article-comment/detail',
    type: 'get',
    response: config => {
      const { article_comment_seq } = config.query
      for (const item of data.articleCommentList) {
        if (item.seq === +article_comment_seq) {
          item.need_expand = false
          item.content = 'detail' + item.content
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },
  {
    url: '/article-comment/create',
    type: 'post',
    response: config => {
      const post = config.body
      if(post.content == 'login'){
        return {
          code: process.env.VUE_APP_CODE_NOT_LOGIN,
          message: 'not login',
          data: {
          }
        }  
      }
      return {
        code: process.env.VUE_APP_CODE_SUCCESS,
        message: 'ok',
        data: {
          seq: List[0].seq
        }
      }
    }
  },
  {
    url: '/article-comment/like',
    type: 'post',
    response: config => {
      const post = config.body
      const seq = post.article_comment_seq
      for (const item of data.articleCommentList) {
        if (item.seq === +seq) {
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
