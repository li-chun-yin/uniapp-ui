const Mock = require('mockjs')

const List = []
const count = 100

const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    seq: '@increment',
    reseq: '1',
    article_seq: '0',
    user_nick: '@first',
    user_avatar: {url: image_uri},
    content: '@paragraph(1, 255)',
    'status|1': ['published', 'draft'],
    pv: '@integer(300, 5000)',
    createtime: +Mock.Random.date('T'),
    updatetime: +Mock.Random.date('T')
  }))
}

module.exports = [
  {
    url: '/article/index',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-seq') {
        mockList = mockList.reverse()
      }

      let pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      let total   = mockList.length

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
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { seq } = config.query
      for (const item of List) {
        if (item.seq === +seq) {
          return {
            code: 20000,
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
    url: '/article/update',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'ok'
      }
    }
  }
]
