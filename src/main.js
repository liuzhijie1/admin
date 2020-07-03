import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {reqLogin} from 'network/api'


// 验证登录成功
reqLogin({username:'admin',password:'123456'}).then(data=>{
  console.log(data);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
