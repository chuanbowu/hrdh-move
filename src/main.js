import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rem from '@/utils/rem'
import 'vant/lib/index.css'
import 'swiper/css/swiper.min.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  rem,
  render: h => h(App)
}).$mount('#app')
