import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'

import system from './system'
import page from './page'
import file from './file'
import role from './role'
import login from './login'
import other from './other'

Vue.use(Router)

const router = new Router({
  routes: [
    system,
    page,
    file,
    role,
    login,
    other,
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
export default router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || to.meta.pathName
  next()
})
