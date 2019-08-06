/**
 * 页面管理 路由配置
 */
import common from '@/routes/common'
import page from '@/routes/page'
import map from '@/routes/page/map'
import slide from '@/routes/page/slide'

export default {
  path: '/page',
  component: common,
  children: [
    {
      path: '',
      meta: {title: '页面内容管理', path: '/system'},
      component: page
    }, {
      path: 'map',
      meta: {title: '共献图谱管理', path: '/system/map'},
      component: map
    }, {
      path: 'slide',
      meta: {title: '幻灯管理', path: '/system/slide'},
      component: slide
    }
  ]
}
