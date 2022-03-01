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

  /** ----提现管理---- **/
  {
    path: '/withdraw',
    name: 'Withdraw',
    redirect: '/withdraw/todo',
    component: Layout,
    children: [
      // 待办信息
      {
        path: '/withdraw/todo',
        name: 'WithdrawTodo',
        component:() => import('../views/withdraw/todo/index.vue'),
        meta: {
          name: 'WithdrawTodo',
          breadcrumb : [{ text: 'message.withdrawals', url: '/withdraw/todo' }, { text: 'message.todo', url: '/withdraw/todo' }]
        }
      },
      // 提现数据
      {
        path: '/withdraw/data',
        name: 'WithdrawData',
        component:() => import('../views/withdraw/data/index.vue'),
        meta: {
          name: 'WithdrawData',
          breadcrumb : [{ text: 'message.withdrawals', url: '/withdraw/data' }, { text: 'message.withdrawData', url: '/withdraw/data' }]
        }
      }
    ]
  },

  /** ----订单数据---- **/
  {
    path: '/order',
    name: 'Order',
    redirect: '/order/data',
    component: Layout,
    children: [
      {
        path: '/order/data',
        name: 'OrderData',
        component:() => import('../views/order/index.vue'),
        meta: {
          name: 'OrderData',
          breadcrumb : [{ text: 'message.orderData', url: '/order/data' }]
        }
      }
    ]
  },

  /** ----客户资料---- **/
  {
    path: '/customer',
    name: 'Customer',
    redirect: '/customer/order',
    component: Layout,
    children: [
      // 大客户资料
      {
        path: '/customer/cnewb',
        name: 'CnewbList',
        component:() => import('../views/customer/cnewb/index.vue'),
        meta: {
          name: 'CnewbCustomer',
          breadcrumb : [{ text: 'message.customerProfiles', url: '/customer/cnewb' }, { text: 'message.cnewbProfiles', url: '/customer/cnewb' }]
        }
      },
      // 大客户资料详情
      {
        path: '/customer/cnewb/detail/:id',
        name: 'CnewbDetail',
        component:() => import('../views/customer/cnewb/detail.vue'),
        meta: {
          name: 'CnewbCustomer',
          breadcrumb : [{ text: 'message.customerProfiles', url: '/customer/cnewb' }, { text: 'message.cnewbProfiles', url: '/customer/cnewb' }, { text: 'message.cnewbDetail', url: '/customer/cnewb/detail/:id' }]
        }
      },
      // 高级经理资料
      {
        path: '/customer/newb',
        name: 'NewbList',
        component:() => import('../views/customer/newb/index.vue'),
        meta: {
          name: 'NewbCustomer',
          breadcrumb : [{ text: 'message.customerProfiles', url: '/customer/newb' }, { text: 'message.newbProfiles', url: '/customer/newb' }]
        }
      },
      // 高级经理资料详情
      {
        path: '/customer/newb/detail/:id',
        name: 'NewbDetail',
        component:() => import('../views/customer/newb/detail.vue'),
        meta: {
          name: 'NewbCustomer',
          breadcrumb : [{ text: 'message.customerProfiles', url: '/customer/newb' }, { text: 'message.newbProfiles', url: '/customer/newb' }, { text: 'message.newbDetail', url: '/customer/newb/detail/:id' }]
        }
      },
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
