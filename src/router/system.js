/**
 * 系统管理 路由配置
 */
import common from '@/routes/common'
import account from '@/routes/system/account'
import department from '@/routes/system/department'

export default {
  path: '/system',
  component: common,
  children: [
    {
      path: 'account',
      meta: {title: '账号查询', path: '/system/account'},
      component: account
    }, {
      path: 'department',
      meta: {title: '部门管理', path: '/system/department'},
      component: department
    }
  ]
}
