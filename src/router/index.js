import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/main'
  },

  /** -----登录页----- **/
  {
    path: '/login',
    name: 'login',
    component:() => import('../views/login/index.vue')
  },

  /** -----首页----- **/
  {
    path: '/main',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component:() => import('../views/index.vue'),
        meta: {
          name: 'Home',
          breadcrumb : [{ text: '首页', url: '/home' }]
        }
      }
    ]
  },

  /** ----待办信息---- **/
  {
    path: '/todo',
    name: 'Todo',
    redirect: '/todo/list',
    component: Layout,
    children: [
      {
        path: '/todo/list',
        name: 'TodoList',
        component:() => import('../views/todo/index.vue'),
        meta: {
          name: 'TodoList',
          breadcrumb : [{ text: '待办信息', url: '/todo/list' }]
        }
      }
    ]
  },

  /** ----数据分析---- **/
  {
    path: '/data',
    name: 'data',
    redirect: '/data/order',
    component: Layout,
    children: [
      // 订单列表
      {
        path: '/data/order',
        name: 'OrderList',
        component:() => import('../views/data/order/index.vue'),
        meta: {
          name: 'OrderList',
          breadcrumb : [{ text: '数据分析', url: '/data/order' }, { text: '订单数据', url: '/data/order' }]
        }
      },
      // 订单详情
      {
        path: '/data/order/detail/:id',
        name: 'OrderDetail',
        component:() => import('../views/data/order/detail.vue'),
        meta: {
          name: 'OrderList',
          breadcrumb : [{ text: '数据分析', url: '/data/order' }, { text: '订单数据', url: '/data/order' }, { text: '订单详情', url: '/data/order/detail/:id' }]
        }
      },
      // 订单分析
      {
        path: '/data/order/analyze',
        name: 'OrderAnalyze',
        component:() => import('../views/data/order/analyze.vue'),
        meta: {
          name: 'OrderAnalyze',
          breadcrumb : [{ text: '数据分析', url: '/data/order/analyze' }, { text: '订单分析', url: '/data/order/analyze' }]
        }
      },
      // 大客户数据
      {
        path: '/data/cnewb',
        name: 'CnewbList',
        component:() => import('../views/data/cnewb/index.vue'),
        meta: {
          name: 'CnewbList',
          breadcrumb : [{ text: '数据分析', url: '/data/cnewb' }, { text: '大客户数据', url: '/data/cnewb' }]
        }
      },
      // 大客户数据详情
      {
        path: '/data/cnewb/detail/:id',
        name: 'CnewbDetail',
        component:() => import('../views/data/cnewb/detail.vue'),
        meta: {
          name: 'CnewbDetail',
          breadcrumb : [{ text: '数据分析', url: '/data/cnewb' }, { text: '大客户数据', url: '/data/cnewb' }, { text: '大客户数据详情', url: '/data/cnewb/detail/:id' }]
        }
      },
      // 高级经理数据
      {
        path: '/data/newb',
        name: 'NewbList',
        component:() => import('../views/data/newb/index.vue'),
        meta: {
          name: 'NewbList',
          breadcrumb : [{ text: '数据分析', url: '/data/newb' }, { text: '高级经理数据', url: '/data/newb' }]
        }
      },
      // 高级经理数据详情
      {
        path: '/data/newb/detail/:id',
        name: 'NewbDetail',
        component:() => import('../views/data/newb/detail.vue'),
        meta: {
          name: 'NewbDetail',
          breadcrumb : [{ text: '数据分析', url: '/data/newb' }, { text: '高级经理数据详情', url: '/data/newb' }, { text: '高级经理数据详情', url: '/data/newb/detail/:id' }]
        }
      },
    ]
  },

  /** ----提现管理---- **/
  {
    path: '/withdraw',
    name: 'Withdraw',
    redirect: '/withdraw/list',
    component: Layout,
    children: [
      {
        path: '/withdraw/list',
        name: 'Withdraw',
        component:() => import('../views/withdraw/index.vue'),
        meta: {
          name: 'Withdraw',
          breadcrumb : [{ text: '提现管理', url: '/withdraw/list' }]
        }
      }
    ]
  },

  /** -------404------- **/
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component:() => import('../views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
