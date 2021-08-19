import '@/api/interceptor'

export function indexApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/article/index', //仅为示例，并非真实接口地址。
      method: 'get',
      data: {
        user_id: data.user_id,
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
      url: '/article/detail', //仅为示例，并非真实接口地址。
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
      url: '/article/create', //仅为示例，并非真实接口地址。
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        title: data.title,
        desc: data.desc,
        image_id: data.image.id,
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

export function updateApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/article/update', //仅为示例，并非真实接口地址。
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        seq: data.seq,
        title: data.title,
        desc: data.desc,
        image_id: data.image.id,
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

export function likeApi(data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: '/article/like', //仅为示例，并非真实接口地址。
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        article_seq: data.seq
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