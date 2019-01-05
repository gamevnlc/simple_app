// External Lib
import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Swal from 'sweetalert2'
// Custom Code
import App from './App'
import router from './router'
import store from './store'
// External lib css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'static/css/ladda.min.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$Swal = Swal
Vue.config.productionTip = false
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
