const Mock = require('mockjs')

const List = []
const count = 50

const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  let replys = []
  let reply_num = 0
  let reply_lists_num = 0
  if( i == 1 ){
    reply_lists_num = 1
    reply_num = 1
  }else if( i == 2 ){
    reply_lists_num = 2
    reply_num = 2
  }else if( i == 3 ){
    reply_lists_num = 2
    reply_num = 3
  }

  if(reply_lists_num > 0){
    for(let j = 0; j <= reply_lists_num - 1; j++){
      replys.push(Mock.mock({
        seq: '@increment',
        article_seq: 1,
        parent_seq: '@integer(0, 10)',
        user_nick: '@first',
        user_avatar: image_uri,
        to_user: '@first',
        content: '@cparagraph(1)',        
        need_expand: true, // '@boolean',  //是否需要展开内容
        like_num: '@integer(300, 5000)',
        is_like: '@Boolean',
        createtime: +Mock.Random.date('T'),
        updatetime: +Mock.Random.date('T')
      }))
    }  
  }

  List.push(Mock.mock({
    seq: '@increment',
    article_seq: 1,
    parent_seq: 0,
    user_nick: '@first',
    user_avatar: image_uri,
    content: '@csentence(1,50)',
    need_expand: true, // '@boolean', //是否需要展开内容
    like_num: '@integer(300, 5000)',
    is_like: '@Boolean',
    createtime: +Mock.Random.date('T'),
    updatetime: +Mock.Random.date('T'),
    replys: replys,
    reply_num: reply_num
  }))
}

module.exports = [
  {
    url: '/article-comment/index',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20, request_type, sort } = config.query

      let mockList = List.filter(item => {
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

      const List = []
      const count = 50

      const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
      const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

      for (let i = 0; i < count; i++) {
        List.push(Mock.mock({
          seq: '@increment',
          author: '@first',
          title: '@title(5, 10)',
          desc: '@title(5, 10)',
          content: baseContent,
          image: {url: image_uri},
          'status|1': ['published', 'draft'],
          is_like: '@Boolean',
          pv: '@integer(300, 5000)',
          comment_num: '@integer(0, 999)',
          createtime: +Mock.Random.date('T'),
          updatetime: +Mock.Random.date('T')
        }))
      }

      if (order_seq === '-seq') {
        List = List.reverse()
      }

      let pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      let total   = List.length

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
      const { seq } = config.query
      for (const item of List) {
        if (item.seq === +seq) {
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
      return {
        code: 20000,
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
      for (const item of List) {
        if (item.seq === +seq) {
          item.is_like = !item.is_like
          return {
            code: 20000,
            message: 'ok'
          }
        }
      }
    }
  }
]
