import axios from 'axios'
import Vue from 'vue'

axios.defaults.withCredentials = true
axios.defaults.timeout = 50000000000
axios.interceptors.request.use(function (config) {
  Vue.prototype.$store.commit('showLoading')
  Vue.prototype.$store.state.loadingTime = new Date().getTime()
  return config
}, function (error) {
  Vue.prototype.$store.commit('hideLoading')
  Vue.prototype.$message.error('ERROR: ' + error.toString())
  return Promise.reject(error)
})

// 影响拦截器，可以自定义 预处理内容
axios.interceptors.response.use(function (response) {
  // 接口参数，权限问题，统一提示，然后错误（业务模块选择性处理）
  Vue.prototype.$store.commit('hideLoading')
  if (response.data.success === 1) return response.data
  if (response.data.errorCode === 3) location.href = '/#/login'
  Vue.prototype.$message.error(response.data.message)
  return Promise.reject(response.data)
},
function (error) {
  // 网络问题，通过2种方式提示，业务不处理
  Vue.prototype.$store.commit('hideLoading')
  Vue.prototype.$message.error('ERROR: ' + error.toString())
  return Promise.reject(error)
})
