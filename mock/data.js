const Mock = require('mockjs')

const tokens = {
  'ex@uni.dev': {
    token: 'ex-token',
    is_login: false
  },
  'empty@uni.dev': {
    token: 'empty-token',
    is_login: false
  },
  '10000000000': {
    token: 'ex-token',
    is_login: false
  },
  '10000000001': {
    token: 'empty-token',
    is_login: false
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

const articleCommentList = []
for (let i = 0; i < 50; i++) {

  let articleCommentItem = Mock.mock({
    seq: '@increment',
    article_seq: articleList[0].seq,
    root_seq: 0,
    parent_seq: 0,
    user_nick: '@first',
    user_avatar: '@image',
    content: '@cparagraph',
    need_expand: true, // '@boolean', //是否需要展开内容
    like_num: '@integer(0, 5000)',
    is_like: '@Boolean',
    createtime: +Mock.Random.date('T'),
    updatetime: +Mock.Random.date('T'),
    replys: [],
    reply_num: 0
  })

  let reply_lists_num = 0
  let parentReply = articleCommentItem
  if( i == 0 ){
    reply_lists_num = 1
    articleCommentItem.reply_num = 1
  }else if( i == 1 ){
    reply_lists_num = 2
    articleCommentItem.reply_num = 2
  }else if( i == 2 ){
    reply_lists_num = 2
    articleCommentItem.reply_num = 3
  }

  if(reply_lists_num > 0){
    for(let j = 0; j <= reply_lists_num - 1; j++){
      parentReply = Mock.mock({
        seq: '@increment',
        article_seq: articleList[0].seq,
        root_seq: articleCommentItem.seq,
        parent_seq: parentReply.seq,
        user_nick: '@first',
        user_avatar: '@image',
        to_user: parentReply.user_nick,
        content: '@cparagraph',        
        need_expand: true, // '@boolean',  //是否需要展开内容
        like_num: '@integer(0, 5000)',
        is_like: '@Boolean',
        createtime: +Mock.Random.date('T'),
        updatetime: +Mock.Random.date('T')
      })
      articleCommentItem.replys.push(parentReply)
    }  
  }
  
  articleCommentList.push(articleCommentItem);
 }

module.exports = { tokens, users, articleList, articleCommentList }