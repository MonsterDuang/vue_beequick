// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import { Lazyload, MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入addCart
import AddCart from '@/plugins/addCart/addCart'
// 使用Lazyload
Vue.use(Lazyload)
Vue.use(AddCart)
Vue.prototype.$msg = MessageBox
// 使用Axios
Vue.prototype.$http = Axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
