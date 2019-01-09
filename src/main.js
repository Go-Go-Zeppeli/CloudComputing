// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueResource from 'vue-resource'
import '../static/css/global.css'

// Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueResource)
Vue.http.headers.common['Content-Type'] = 'application/json'
// Vue.prototype.HOST = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
