/**
 * 文档管理 路由配置
 */
import common from '@/routes/common'
import total from '@/routes/other/total'
import log from '@/routes/other/log'

export default {
  path: '/other',
  component: common,
  children: [
    {
      path: 'total',
      meta: {title: '文档管理', path: '/other/total'},
      component: total
    }, {
      path: 'log',
      meta: {title: '文档类目管理', path: '/other/log'},
      component: log
    }
  ]
}
