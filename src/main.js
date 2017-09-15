// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import moment from 'vue-moment'
import i18n from './i18n'
import VueLocalStorage from 'vue-localstorage'

Vue.use(Vuetify)
Vue.use(moment)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
