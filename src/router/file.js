/**
 * 文档管理 路由配置
 */
import common from '@/routes/common'
import file from '@/routes/file'
import category from '@/routes/file/category'

export default {
  path: '/file',
  component: common,
  children: [
    {
      path: '',
      meta: {title: '文档管理', path: '/file'},
      component: file
    }, {
      path: 'category',
      meta: {title: '文档类目管理', path: '/file/category'},
      component: category
    }
  ]
}
