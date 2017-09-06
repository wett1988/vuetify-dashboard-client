import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import roles from './modules/roles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    roles
  }
})
