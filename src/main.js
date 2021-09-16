import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('hm-token-backend')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
