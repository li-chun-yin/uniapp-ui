uniapp-ui
====================================

* 这是一个基于[uniapp](https://uniapp.dcloud.io)
和[uview-ui](https://www.uviewui.com/)
的前端H5 UI（虽然uniapp支持编译成多个不同类型的客户端的代码，但是我还没有测试）

* 目前，这个UI代码有含有登录、文章（列表、表单、详情）、图片上传、富文本编辑等UI元素。

使用
====================================
* 我这个代码是使用[uniapp提供的vue-cli](https://uniapp.dcloud.io/quickstart-cli)方式创建的

* 代码拉去以后需要配置src/manifest.json和srcpages.json，可以参考src/manifest.json.default和srcpages.json.default


```
git clone https://github.com/li-chun-yin/uniapp-ui.git

npm install

npm run dev:h5
```

数据模拟
==========================================
* 本项目使用了[mockjs](http://mockjs.com/)模拟API接口数据

* API模拟不会检查验证码是否有效，可以随意输入

* API模拟提供了两个不同的用户
  * ex@uni.dev，用于调试有数据展示的页面
  * empty@uni.dev，用于调试页面不存在数据的情况

API接口和环境相关的配置
==========================================
* 通过.env.development配置，开发调试时候的接口地址

* 通过.env.production配置，打包正式环境时候的地址

* 其他环境相关的配置也是放在.env文件中
