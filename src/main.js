import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './assets/upload.css'

import $echarts from 'echarts'

Vue.prototype.$echarts = $echarts

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl (type = "shop") {
      return `https://elm.cangdu.org/v1/addimg/${type}`
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
