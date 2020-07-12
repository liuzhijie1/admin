import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import ZkTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(ZkTable)
Vue.use(VueQuillEditor)

// import {reqLogin} from 'network/api'
Vue.filter('timeFormat',(value)=>{
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth()+1+'').padStart(2,0);
  let day = (date.getDate()+'').padStart(2,0);
  let hour = (date.getHours()+'').padStart(2,0);
  let minute = (date.getMinutes()+'').padStart(2,0);
  let second = (date.getSeconds()+'').padStart(2,0);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
})


Vue.use(ElementUI);

// 验证登录成功
// reqLogin({username:'admin',password:'123456'}).then(data=>{
//   console.log(data);
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
