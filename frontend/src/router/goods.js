export default {
  path: '/goods',
  name: 'goods',
  component: () => import('@/layouts/BaseLayout'),
  redirect: '/finance/classification',
  children: [
    {
      path: 'classification',
      meta: { title: '产品分类', permission: 'goods_category' },
      component: () => import('@/views/goods/classification/index'),
    },
    {
      path: 'unit',
      meta: { title: '产品单位', permission: 'goods_unit' },
      component: () => import('@/views/goods/unit/index'),
    },
    {
      path: 'information',
      meta: { title: '产品信息', permission: 'goods' },
      component: () => import('@/views/goods/information/index'),
    },
    {
      path: 'temporary_warning',
      meta: { title: '临期预警', permission: 'goods' },
      component: () => import('@/views/goods/temporaryWarning/index'),
    },
  ],
}