import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/FindPassword',
    name: 'FindPassword',
    component: () => import('@/views/FindPassword')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('@/views/Search')
  },
  {
    path: '/Sensations',
    name: 'Sensations',
    component: () => import('@/views/Sensations')
  },
  {
    path: '/SensationSearch',
    name: 'SensationSearch',
    component: () => import('@/views/SensationSearch')
  },
  {
    path: '/SensationsDetail',
    name: 'SensationsDetail',
    component: () => import('@/views/SensationsDetail')
  },
  {
    path: '/TakeDeliveryList',
    name: 'TakeDeliveryList',
    component: () => import('@/views/TakeDeliveryList')
  },
  {
    path: '/GoodsDetail',
    name: 'GoodsDetail',
    component: () => import('@/views/GoodsDetail')
  },
  {
    path: '/SubmiTakeDelivery',
    name: 'SubmiTakeDelivery',
    component: () => import('@/views/SubmiTakeDelivery')
  },
  {
    path: '/ReturnCommissionList',
    name: 'ReturnCommissionList',
    component: () => import('@/views/ReturnCommissionList')
  },
  {
    path: '/ReturnCommissionDetail',
    name: 'ReturnCommissionDetail',
    component: () => import('@/views/ReturnCommissionDetail')
  },
  {
    path: '/ShakeData',
    name: 'ShakeData',
    component: () => import('@/views/ShakeData')
  },
  {
    path: '/SearchShakeData',
    name: 'SearchShakeData',
    component: () => import('@/views/SearchShakeData')
  },
  {
    path: '/TipGoods',
    name: 'TipGoods',
    component: () => import('@/views/TipGoods')
  },
  {
    path: '/PersonalData',
    name: 'PersonalData',
    component: () => import('@/views/PersonalData')
  },
  {
    path: '/EditPersonalData',
    name: 'EditPersonalData',
    component: () => import('@/views/EditPersonalData')
  },
  {
    path: '/Authentication',
    name: 'Authentication',
    component: () => import('@/views/Authentication')
  },
  {
    path: '/MyTakeDelivery',
    name: 'MyTakeDelivery',
    component: () => import('@/views/MyTakeDelivery')
  },
  {
    path: '/MyBalance',
    name: 'MyBalance',
    component: () => import('@/views/MyBalance')
  },
  {
    path: '/IncomeDetails',
    name: 'IncomeDetails',
    component: () => import('@/views/IncomeDetails')
  },
  {
    path: '/WithdrawalRecord',
    name: 'WithdrawalRecord',
    component: () => import('@/views/WithdrawalRecord')
  },
  {
    path: '/CustomerService',
    name: 'CustomerService',
    component: () => import('@/views/CustomerService')
  },
  {
    path: '/MyTakeDeliveryDetail',
    name: 'MyTakeDeliveryDetail',
    component: () => import('@/views/MyTakeDeliveryDetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/hrdh-h5',
  // base: '/',
  routes
})

export default router
