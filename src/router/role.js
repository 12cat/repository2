/**
 * 角色管理
 */
import common from '@/routes/common'
import role from '@/routes/role'

export default {
  path: '/role',
  component: common,
  children: [
    {
      path: '',
      meta: {title: '角色管理', path: '/role'},
      component: role
    }
  ]
}
