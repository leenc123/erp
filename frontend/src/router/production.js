export default {
  path: '/production',
  name: 'production',
  component: () => import('@/layouts/BaseLayout'),
  redirect: '/production/plan',
  children: [
    {
      path: 'plan',
      meta: { title: '生产计划',permission: 'production_order' },
      component: () => import('@/views/production/productionPlan/index'),
    },
    {
      path: 'detial',
      meta: { title: '生产计划详情' ,permission: 'production_order'},
      component: () => import('@/views/production/productionDetial/index'),
    },
    {
      path: 'task',
      meta: { title: '生产任务' ,permission: 'production_order'},
      component: () => import('@/views/production/productionTask/index'),
    },
    {
      path: 'record',
      meta: { title: '生产记录',permission: 'production_record' },
      component: () => import('@/views/production/productionRecord/index'),
    },
  ],
}