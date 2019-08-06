// import axios from 'axios'
import './httpConfig'
import modules from './modules'

// globel request
// const getMenus = () => {
//   return axios.get('/api/memu')
// }

export default {
  // getMenus,
  ...modules
}
