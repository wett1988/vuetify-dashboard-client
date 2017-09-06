// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'

import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import _ from 'lodash'

// Workaround to use Lodash in Vue templates
Vue.mixin({
  computed: {
    _ () {
      return _
    }
  }
})

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.router = router

// import axios from 'axios'
import axios from '@/plugins/axios'

import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAxios, axios)

// Vue.axios.defaults.baseURL = 'http://api.nc-realty.dev/api/v1'

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//  authRedirect: {path: '/login'}
  rolesVar: 'scopes'
})

// Start
App.router = Vue.router
App.store = store

new Vue(App).$mount('#app')

/* eslint-disable no-new */
//  new Vue({
//  el: '#app',
//  router,
//  template: '<App/>',
//  components: { App }
//  })
