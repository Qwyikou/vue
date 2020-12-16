import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 先下载cnpm install mint-ui --save
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//下载cnpm i ly-tab -S
import LyTab from 'ly-tab'
Vue.use(LyTab)

// 导入路由模块
import router from './router/router.js'

// 引入状态管理store模块
import store from "./store/index.js"

new Vue({
  router,
  store,//挂载
  render: h => h(App),
}).$mount('#app')
