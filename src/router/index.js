import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决重复点击同一个路由导致报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
    redirect: '/index/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'articleList',
        component: () => import('@/views/articleList.vue')
      },
      {
        path: 'addArticle',
        component: () => import('@/views/addArticle')
      },
      {
        path: '/column',
        component: () => import('@/views/column.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
