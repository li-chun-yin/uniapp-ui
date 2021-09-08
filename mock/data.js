const Mock = require('mockjs')

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
    avatar: Mock.Random.image(),
    nick: 'general',
    phone: '10000000000'
  },
  'empty-token': {
    roles: ['user'],
    user_id: 'user_id2',
    introduction: '这个用户用来测试用户数据为空的时候的情况',
    avatar: Mock.Random.image(),
    nick: 'data-empty',
    phone: '10000000001'
  }
}


const articleList = []

for (let i = 0; i < 50; i++) {
  articleList.push(Mock.mock({
    seq: '@increment',
    author: 'user_id1',
    title: '@title(5, 10)',
    desc: '@title(5, 10)',
    content: '@cparagraph',
    image: {url: '@image'},
    is_like: '@Boolean',
    pv: '@integer(0, 5000)',
    comment_num: 0,
    createtime: +Mock.Random.date('T'),
    updatetime: +Mock.Random.date('T')
  }))
}


module.exports = { tokens, users, articleList }