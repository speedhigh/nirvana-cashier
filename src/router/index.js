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
        component:() => import('../views/home/index.vue'),
        meta: {
          name: 'Home',
          breadcrumb : [{ text: 'message.home', url: '/home' }]
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
          breadcrumb : [{ text: 'message.todo', url: '/todo/list' }]
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
          name: 'OrderData',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/order' }, { text: 'message.orderData', url: '/data/order' }]
        }
      },
      // 订单详情
      {
        path: '/data/order/detail/:id',
        name: 'OrderDetail',
        component:() => import('../views/data/order/detail.vue'),
        meta: {
          name: 'OrderData',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/order' }, { text: 'message.orderData', url: '/data/order' }, { text: 'message.orderDetail', url: '/data/order/detail/:id' }]
        }
      },
      // 订单分析
      {
        path: '/data/analyze',
        name: 'OrderAnalyze',
        component:() => import('../views/data/analyze/index.vue'),
        meta: {
          name: 'OrderAnalyze',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/analyze/index.vue' }, { text: 'message.orderAnalysis', url: '/data/analyze/index.vue' }]
        }
      },
      // 大客户数据
      {
        path: '/data/cnewb',
        name: 'CnewbList',
        component:() => import('../views/data/cnewb/index.vue'),
        meta: {
          name: 'CnewbData',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/cnewb' }, { text: 'message.customerData', url: '/data/cnewb' }]
        }
      },
      // 大客户数据详情
      {
        path: '/data/cnewb/detail/:id',
        name: 'CnewbDetail',
        component:() => import('../views/data/cnewb/detail.vue'),
        meta: {
          name: 'CnewbData',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/cnewb' }, { text: 'message.customerData', url: '/data/cnewb' }, { text: 'message.customerDetail', url: '/data/cnewb/detail/:id' }]
        }
      },
      // 高级经理数据
      {
        path: '/data/newb',
        name: 'NewbList',
        component:() => import('../views/data/newb/index.vue'),
        meta: {
          name: 'NewbData',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/newb' }, { text: 'message.managerData', url: '/data/newb' }]
        }
      },
      // 高级经理数据详情
      {
        path: '/data/newb/detail/:id',
        name: 'NewbDetail',
        component:() => import('../views/data/newb/detail.vue'),
        meta: {
          name: 'NewbData',
          breadcrumb : [{ text: 'message.dataAnalysis', url: '/data/newb' }, { text: 'message.managerData', url: '/data/newb' }, { text: 'message.managerDetail', url: '/data/newb/detail/:id' }]
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
          breadcrumb : [{ text: 'message.withdrawals', url: '/withdraw/list' }]
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


router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr) return next('/login')
  next()
})

export default router
