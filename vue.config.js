'use strict'

// All configuration item explanations can be find in https://cli.vuejs.org/config/
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV == 'development'){
  module.exports = {
    devServer: {
      before: require('./mock/mock-server.js')
    }
  }  
}
