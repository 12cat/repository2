// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {

  },
  state: { // 调用方法：$store.state.text
    // uploadPath: 'http://7ce3386a.ngrok.io/config/uploadFile',
    // domain_name: 'http://7ce3386a.ngrok.io/',
    uploadPath: 'http://47.92.129.232:8081/config/uploadFile',
    domain_name: 'http://47.92.129.232:8081/',
    user_id: '', // 用户id
    user_name: '', // 用户名
    unauth: false,
    auth: {}, // 用户权限
    // loading
    loadingTime: 0,
    loading: false
  },
  mutations: { // $store.commit('showLoading')
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      let endTime = new Date().getTime()
      let interval = 500 - (endTime - state.loadingTime)
      if (interval < 0) {
        state.loading = false
      } else {
        setTimeout(() => {
          state.loading = false
        }, interval)
      }
    }
  }
})

// 方便调用
Vue.prototype.$store = store

export default store
