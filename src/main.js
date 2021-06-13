import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

// uView
import uView from "uview-ui";
Vue.use(uView, app);

import * as filters from './utils/filter' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

app.$mount()
