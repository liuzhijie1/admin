import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from "good-storage";
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


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
      },
      meta:{
        title:'登录'
      }
    },
    {
      path:'/home',
      component:()=> import('views/home/Home.vue'),
      meta:{
        title:'主页'
      },
      children:[
        {
          path:'',
          component:()=>import('views/welcomes/Welcome.vue'),
          meta:{
            title:'主页'
          },
        },
        {
          path:'/users',
          component:()=>import('views/users/Users.vue'),
          meta:{
            title:'用户页'
          }
        },
        {
          path:'/roles',
          component:()=>import('views/roles/Roles.vue'),
          meta:{
            title:'角色页'
          }
        },
        {
          path:'/rights',
          component:()=>import('views/rights/Rights.vue'),
          meta:{
            title:'权限页'
          }
        },
        {
          path:'/goods',
          component:()=>import('views/goods/Goods.vue'),
          meta:{
            title:'商品列表'
          }
        },
        {
          path:'/params',
          component:()=>import('views/params/Params.vue'),
          meta:{
            title:'分类参数'
          }
        },
        {
          path:'/categories',
          component:()=>import('views/categories/Categories.vue'),
          meta:{
            title:'商品分类'
          }
        },
        {
          path:'/orders',
          component:()=>import('views/orders/Orders.vue'),
          meta:{
            title:'订单列表'
          }
        },
        {
          path:'/reports',
          component:()=>import('views/reports/Reports.vue'),
          meta:{
            title:'报表'
          }
        },
        {
          path:'/goods/add',
          component:()=>import('views/goods/child/AddGoods.vue'),
          meta:{
            title:'添加商品',
          }
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 全局进入路由
router.beforeEach((to,from,next)=>{
  window.document.title  = to.meta.title;
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
