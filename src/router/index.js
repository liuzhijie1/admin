import Vue from 'vue'
import VueRouter from 'vue-router'

// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/login',
      component:()=> import('views/login/Login.vue'),
    },
    {
      path:'/home',
      component:()=> import('views/Home.vue'),
    }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
