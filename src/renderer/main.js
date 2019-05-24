import Vue from 'vue'
import App from './App'

import 'material-icons/iconfont/material-icons.css'
import './assets/w3.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
