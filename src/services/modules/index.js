import vue from 'vue'
import axios from 'axios'
import kms from './kms'

let obj = {}
let baseUrl = vue.prototype.$store.state.domain_name
let arr = [kms]

arr.forEach(p => {
  obj[p.category] = {}
  p.pathList.forEach(v => {
    // 目前仅支持 post 请求和 get 请求
    obj[p.category][v.key] = param => { return axios.post(baseUrl + v.url, param) }
  })
})

export default obj
