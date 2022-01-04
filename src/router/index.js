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
          name: 'Home'
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
          name: 'TodoList'
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
          name: 'OrderList'
        }
      },
      // 订单详情
      {
        path: '/data/order/detail/:id',
        name: 'OrderDetail',
        component:() => import('../views/data/order/detail.vue'),
        meta: {
          name: 'OrderDetail'
        }
      },
      // 订单分析
      {
        path: '/data/order/analyze',
        name: 'OrderAnalyze',
        component:() => import('../views/data/order/analyze.vue'),
        meta: {
          name: 'OrderAnalyze'
        }
      },
      // 大客户列表
      {
        path: '/data/cnewb',
        name: 'CnewbList',
        component:() => import('../views/data/cnewb/index.vue'),
        meta: {
          name: 'CnewbList'
        }
      },
      // 大客户详情
      {
        path: '/data/cnewb/detail/:id',
        name: 'CnewbDetail',
        component:() => import('../views/data/cnewb/detail.vue'),
        meta: {
          name: 'CnewbDetail'
        }
      },
      // 高级经理列表
      {
        path: '/data/newb',
        name: 'NewbList',
        component:() => import('../views/data/newb/index.vue'),
        meta: {
          name: 'NewbList'
        }
      },
      // 高级经理详情
      {
        path: '/data/newb/detail/:id',
        name: 'NewbDetail',
        component:() => import('../views/data/newb/detail.vue'),
        meta: {
          name: 'NewbDetail'
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
          name: 'Withdraw'
        }
      }
    ]
  },

  /** -------404------- **/
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component:() => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
