export default {
  path: '/sale',
  name: 'sale',
  component: () => import('@/layouts/BaseLayout'),
  redirect: '/sale/sale_create',
  children: [
    {
      path: 'sale_create',
      meta: { title: '销售开单', permission: 'sales_order' },
      component: () => import('@/views/sale/saleCreate/index'),
    },
    {
      path: 'sale_record',
      meta: { title: '销售记录', permission: 'sales_order' },
      component: () => import('@/views/sale/saleRecord/index'),
    },
    {
      path: 'sale_record_detail',
      meta: { title: '销售记录详情', permission: 'sales_order' },
      component: () => import('@/views/sale/saleRecordDetail/index'),
    },
    {
      path: 'sale_return_create',
      meta: { title: '销售退货', permission: 'sales_return_order' },
      component: () => import('@/views/sale/saleReturnCreate/index'),
    },
    {
      path: 'sale_return_record',
      meta: { title: '销售退货记录', permission: 'sales_return_order' },
      component: () => import('@/views/sale/saleReturnRecord/index'),
    },
    {
      path: 'sale_return_detail',
      meta: { title: '退货记录详情', permission: 'sales_return_order' },
      component: () => import('@/views/sale/saleReturnDetail/index'),
    },
  ],
}