// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import services from '@/services'
import utils from '@/utils'
import directive from '@/utils/directive'
import filter from '@/utils/filter'

// self plugins
Vue.use(elementUI, {size: 'small'})
Vue.prototype.$utils = utils
Vue.prototype.$service = services
Vue.prototype.qs = qs
Vue.prototype.axios = axios
Vue.config.productionTip = false

// 引入自定义指令
for (let key in directive) {
  Vue.directive(key, directive[key])
}
// 引入自定义过滤器
for (let key in filter) {
  Vue.filter(key, filter[key])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
