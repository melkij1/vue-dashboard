import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Registr',
    meta: {layout: 'empty'},
    component: () => import('../views/Registr.vue')
  },
  {
    path: '/',
    name: 'Index',
    meta: {layout: 'main'},
    component: () => import('../views/Index.vue')
  },
  {
    path: '/category/:id',
    name: 'Category',
    meta: {layout: 'main'},
    component: () => import('../views/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
