import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from "good-storage";
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
      beforeEnter:(to,from,next)=>{
        if(storage.session.get('token')){
          // 这里无法访问router 所以需要用原生的来操作。
          history.back(); 
        }else{
          next();
        }
        console.log('请入登录路由');
      }
    },
    {
      path:'/home',
      component:()=> import('views/home/Home.vue'),
    }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 全局进入路由
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
  }else{
    if(storage.session.get('token')){
      next();
    }else{
      next('/login');
    }
  }
  
})

export default router
