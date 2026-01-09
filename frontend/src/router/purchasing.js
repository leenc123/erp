export default {
  path: '/purchasing',
  name: 'purchasing',
  component: () => import('@/layouts/BaseLayout'),
  redirect: '/purchasing/purchase_create',
  children: [
    {
      path: 'purchase_create',
      meta: { title: '采购开单', permission: 'purchase_order' },
      component: () => import('@/views/purchasing/purchaseCreate/index'),
    },
    {
      path: 'purchase_record',
      meta: { title: '采购记录', permission: 'purchase_order' },
      component: () => import('@/views/purchasing/purchaseRecord/index'),
    },
    {
      path: 'purchase_record_detail',
      meta: { title: '采购记录详情', permission: 'purchase_order' },
      component: () => import('@/views/purchasing/purchaseRecordDetail/index'),
    },
    {
      path: 'purchase_return_create',
      meta: { title: '采购退货', permission: 'purchase_return_order' },
      component: () => import('@/views/purchasing/purchaseReturnCreate/index'),
    },
    {
      path: 'return_record',
      meta: { title: '退货记录', permission: 'purchase_return_order' },
      component: () => import('@/views/purchasing/returnRecord/index'),
    },
    {
      path: 'return_record_detail',
      meta: { title: '退货记录详情', permission: 'purchase_return_order' },
      component: () => import('@/views/purchasing/returnRecordDetail/index'),
    },
  ],
}