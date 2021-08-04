import '@/api/interceptor'

export function indexApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/article-comment/index', //仅为示例，并非真实接口地址。
      method: 'get',
      data: {
        article_seq: data.article_seq,
        page: data.page,
        limit: data.limit
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err)=>{
        reject(err)
      },
      complete(done) {
        console.log(done)
      }
    })
  });
}

export function detailApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/article-comment/detail', //仅为示例，并非真实接口地址。
      method: 'get',
      data: {
        seq: data.seq
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err)=>{
        reject(err)
      },
      complete(done) {
        console.log(done)
      }
    })
  });
}

export function createApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/article-comment/create', //仅为示例，并非真实接口地址。
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        article_seq: data.article_seq,
        parent_seq: data.parent_seq,
        content: data.content
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err)=>{
        reject(err)
      },
      complete(done) {
        console.log(done)
      }
    })
  });
}